const crypto = require('crypto');
const hexToBytes = require('./funcs/h2b');
const { toByteArray } = require('base64-js')
const NodeRSA = require('node-rsa');


class CloverRSA {
    constructor() {}

    encryptData({ TA_DEV_KEY, cc, mes, ano, cvv }) {
        try {
            const encryptedData = {};

            if (cc) {
                encryptedData.cc = this.encrypt(TA_DEV_KEY, cc);
                if (!encryptedData.cc) {
                    throw new Error('Encryption failed for credit card number');
                }
            }
            if (mes) {
                encryptedData.mes = this.encrypt(TA_DEV_KEY, mes);
                if (!encryptedData.mes) {
                    throw new Error('Encryption failed for month');
                }
            }
            if (ano) {
                encryptedData.ano = this.encrypt(TA_DEV_KEY, ano);
                if (!encryptedData.ano) {
                    throw new Error('Encryption failed for year');
                }
            }
            if (cvv) {
                encryptedData.cvv = this.encrypt(TA_DEV_KEY, cvv);
                if (!encryptedData.cvv) {
                    throw new Error('Encryption failed for CVV');
                }
            }

            return encryptedData;
        } catch (error) {
            console.error('Encryption Error:', error);
            throw error;
        }
    }

    encrypt(TA_DEV_KEY, plaintext) {
        try {
            const decodedKey = toByteArray(TA_DEV_KEY);
            const hexKey = Array.from(decodedKey, byte => byte.toString(16).padStart(2, '0')).join('');
            const modulusHex = hexKey.slice(0, 512);
            const exponentHex = hexKey.slice(-5);
            const rsaKey = new NodeRSA();
            rsaKey.importKey({
                n: hexToBytes(modulusHex),
                e: parseInt(exponentHex, 16),
            }, 'components-public');


            const publicKeyPEM = rsaKey.exportKey('public');
            const publicKeyDER = crypto.createPublicKey(publicKeyPEM);
            // Construct an RSA public key object
            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: publicKeyDER,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha1',
                },
                Buffer.from(`00000000${plaintext}`)
            );

            return encryptedBuffer.toString('base64');
        } catch (error) {
            console.error('Encryption Error:', error);
            return null;
        }
    }
}

module.exports = CloverRSA;
