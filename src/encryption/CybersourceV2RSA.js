const crypto = require('crypto');
const { jwtDecode } = require('jwt-decode');

class CybersourceV2 {
    constructor() { }

    async encryptData({ pubkey, cc, mes, ano, cvv }) {
        try {
            const encryptedData = {};
            const determineCardType = (ccNumber) => {
                if (ccNumber.startsWith("4")) {
                    return "001"; // Visa
                } else if (ccNumber.startsWith("5")) {
                    return "002"; // MasterCard
                } else if (ccNumber.startsWith("3")) {
                    return "003"; // AmexCard
                } else if (ccNumber.startsWith("6")) {
                    return "004"; // DiscoverCard
                } else {
                    return null; // Unknown card type
                }
            };
        
            const cardType = determineCardType(cc);
            const cardData = {
                number: cc,
                type: cardType,
                expirationMonth: mes,
                expirationYear: ano,
                securityCode: cvv
            };
    
            if (cc) {
                const encrypted = await this.encrypt(pubkey, cardData);
                if (!encrypted) {
                    throw new Error('Encryption failed for credit card number');
                }
                encryptedData.encryptedData = encrypted;
            }
    
            return encryptedData;
        } catch (error) {
            console.error('Encryption Error:', error);
            throw error;
        }
        
    }

    async encrypt(pubkey, plaintext) {
        const arrayBufferToString = (buf) => {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        };

        const stringToArrayBuffer = (str) => {
            const buffer = new ArrayBuffer(str.length);
            const array = new Uint8Array(buffer);
            for (let i = 0; i < str.length; i++) {
                array[i] = str.charCodeAt(i);
            }
            return buffer;
        };

        const replace = (str) => {
            return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        };

        const generateKey = async () => {
            return crypto.subtle.generateKey(
                {
                    name: 'AES-GCM',
                    length: 256,
                },
                true,
                ['encrypt']
            );
        };

        const importKey = async (jsonWebKey) => {
            return crypto.subtle.importKey(
                'jwk',
                jsonWebKey,
                {
                    name: 'RSA-OAEP',
                    hash: 'SHA-1',
                },
                false,
                ['wrapKey']
            );
        };

        const wrapKey = async (key, jsonWebKey) => {
            const wrappingKey = await importKey(jsonWebKey);
            const params = {
                name: 'RSA-OAEP',
                hash: 'SHA-1',
            };
            return crypto.subtle.wrapKey('raw', key, wrappingKey, params);
        };

        const build = async (buffer, key, iv, header, jsonWebKey) => {
            const u = buffer.byteLength - ((128 + 7) >> 3);
            const keyBuffer = await wrapKey(key, jsonWebKey);
            return [
                replace(JSON.stringify(header)),
                replace(arrayBufferToString(keyBuffer)),
                replace(arrayBufferToString(iv)),
                replace(arrayBufferToString(buffer.slice(0, u))),
                replace(arrayBufferToString(buffer.slice(u))),
            ].join('.');
        };

        const _encrypt = async (payload, key, header, iv) => {
            const algorithm = {
                name: 'AES-GCM',
                iv,
                additionalData: stringToArrayBuffer(replace(JSON.stringify(header))),
                tagLength: 128,
            };

            const buffer = await crypto.subtle.encrypt(
                algorithm,
                key,
                stringToArrayBuffer(JSON.stringify(payload))
            );

            return [buffer, key];
        };

        const encrypt = async (data, pubkey, index = 0) => {
            const keyId = jwtDecode(pubkey);

            const header = {
                kid: keyId.flx.jwk.kid,
                alg: 'RSA-OAEP',
                enc: 'A256GCM',
            };

            const payload = {
                data,
                pubkey,
                index,
            };

            const iv = crypto.getRandomValues(new Uint8Array(12));

            try {
                const key = await generateKey();
                const encryptedData = await _encrypt(payload, key, header, iv);
                const builtData = await build(encryptedData[0], encryptedData[1], iv, header, keyId.flx.jwk);
                return builtData;
            } catch (error) {
                console.error('Encryption error:', error);
                return null;
            }
        };

        return await encrypt(plaintext, pubkey);
    }
}


module.exports = CybersourceV2;
