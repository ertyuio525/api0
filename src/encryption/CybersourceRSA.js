const crypto = require('crypto');
const jwkToPem = require('jwk-to-pem');

class CybersourceSHA256 {
    constructor() { }

    encryptData({ pubkey, cc, mes, ano, cvv }) {
        try {
            const encryptedData = {};

            if (cc) {
                encryptedData.cc = this.encrypt(pubkey, cc);
                if (!encryptedData.cc) {
                    throw new Error('Encryption failed for credit card number');
                }
            }
            if (mes) {
                encryptedData.mes = this.encrypt(pubkey, mes);
                if (!encryptedData.mes) {
                    throw new Error('Encryption failed for month');
                }
            }
            if (ano) {
                encryptedData.ano = this.encrypt(pubkey, ano);
                if (!encryptedData.ano) {
                    throw new Error('Encryption failed for year');
                }
            }
            if (cvv) {
                encryptedData.cvv = this.encrypt(pubkey, cvv);
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

    encrypt(pubkey, plaintext) {
        try {
            const pubkeyPEM = `-----BEGIN PUBLIC KEY-----
${pubkey}
-----END PUBLIC KEY-----`;
            const pubkeyDER = crypto.createPublicKey(pubkeyPEM);
            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: pubkeyDER,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                Buffer.from(plaintext)
            );

            return encryptedBuffer.toString('base64');
        } catch (error) {
            console.error('Encryption Error:', error);
            return null;
        }
    }
}

class CybersourceSHA1 {
    constructor() { }

    encryptData({ pubkey, cc, mes, ano, cvv }) {
        try {
            const encryptedData = {};

            if (cc) {
                encryptedData.cc = this.encrypt(pubkey, cc);
                if (!encryptedData.cc) {
                    throw new Error('Encryption failed for credit card number');
                }
            }
            if (mes) {
                encryptedData.mes = this.encrypt(pubkey, mes);
                if (!encryptedData.mes) {
                    throw new Error('Encryption failed for month');
                }
            }
            if (ano) {
                encryptedData.ano = this.encrypt(pubkey, ano);
                if (!encryptedData.ano) {
                    throw new Error('Encryption failed for year');
                }
            }
            if (cvv) {
                encryptedData.cvv = this.encrypt(pubkey, cvv);
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

    encrypt(pubkey, plaintext) {
        try {
            const pubkeyPEM = `-----BEGIN PUBLIC KEY-----
${pubkey}
-----END PUBLIC KEY-----`;
            const pubkeyDER = crypto.createPublicKey(pubkeyPEM);
            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: pubkeyDER,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha1',
                },
                Buffer.from(plaintext)
            );

            return encryptedBuffer.toString('base64');
        } catch (error) {
            console.error('Encryption Error:', error);
            return null;
        }
    }
}


class Cybersourcen1 {
    constructor() { }

    encryptData({ pubkey, cc, mes, ano, cvv }) {
        try {
            const encryptedData = {};

            if (cc) {
                encryptedData.cc = this.encrypt(pubkey, cc);
                if (!encryptedData.cc) {
                    throw new Error('Encryption failed for credit card number');
                }
            }
            if (mes) {
                encryptedData.mes = this.encrypt(pubkey, mes);
                if (!encryptedData.mes) {
                    throw new Error('Encryption failed for month');
                }
            }
            if (ano) {
                encryptedData.ano = this.encrypt(pubkey, ano);
                if (!encryptedData.ano) {
                    throw new Error('Encryption failed for year');
                }
            }
            if (cvv) {
                encryptedData.cvv = this.encrypt(pubkey, cvv);
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

    encrypt(pubkey, plaintext) {
        try {
            const jwkData = {
                "kty": "RSA",
                "e": "AQAB",
                "use": "enc",
                "n": pubkey
            };
            const publicKey = jwkToPem(jwkData);
            const publicKeyBase64 = publicKey
                .replace('-----BEGIN PUBLIC KEY-----\n', '')
                .replace('-----END PUBLIC KEY-----', '')
                .replace(/\n/g, '');
            const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
${publicKeyBase64}
-----END PUBLIC KEY-----`;

            const publicKeyDER = crypto.createPublicKey(publicKeyPEM);
            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: publicKeyDER,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                Buffer.from(plaintext)
            );

            return encryptedBuffer.toString('base64');
        } catch (error) {
            console.error('Encryption Error:', error);
            return null;
        }
    }
}

class Cybersourcen2 {
    constructor() { }

    encryptData({ pubkey, cc, mes, ano, cvv }) {
        try {
            const encryptedData = {};

            if (cc) {
                encryptedData.cc = this.encrypt(pubkey, cc);
                if (!encryptedData.cc) {
                    throw new Error('Encryption failed for credit card number');
                }
            }
            if (mes) {
                encryptedData.mes = this.encrypt(pubkey, mes);
                if (!encryptedData.mes) {
                    throw new Error('Encryption failed for month');
                }
            }
            if (ano) {
                encryptedData.ano = this.encrypt(pubkey, ano);
                if (!encryptedData.ano) {
                    throw new Error('Encryption failed for year');
                }
            }
            if (cvv) {
                encryptedData.cvv = this.encrypt(pubkey, cvv);
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

    encrypt(pubkey, plaintext) {
        try {
            const jwkData = {
                "kty": "RSA",
                "e": "AQAB",
                "use": "enc",
                "n": pubkey
            };
            const publicKey = jwkToPem(jwkData);
            const publicKeyBase64 = publicKey
                .replace('-----BEGIN PUBLIC KEY-----\n', '')
                .replace('-----END PUBLIC KEY-----', '')
                .replace(/\n/g, '');
            const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
${publicKeyBase64}
-----END PUBLIC KEY-----`;

            const publicKeyDER = crypto.createPublicKey(publicKeyPEM);
            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: publicKeyDER,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha1',
                },
                Buffer.from(plaintext)
            );

            return encryptedBuffer.toString('base64');
        } catch (error) {
            console.error('Encryption Error:', error);
            return null;
        }
    }
}
module.exports = {
    CybersourceSHA256,
    CybersourceSHA1,
    Cybersourcen1,
    Cybersourcen2
};
