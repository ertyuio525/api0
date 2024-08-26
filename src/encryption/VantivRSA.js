const NodeRSA = require('node-rsa');
const hexToBytes = require('./funcs/h2b')
const crypto = require('crypto');

class VantivRSA {
    constructor() {}

    encryptData({ pubkey, cc, mes, ano, cvv }) {
        try {
            
            const encryptedData = {};

            if (cc) {
                encryptedData.cc = this.encrypt(pubkey, cc);
                if (!encryptedData.cc) {
                    return res.status(400).json({ error: 'Encryption failed for credit card number.' });
                }
            }
            if (mes) {
                encryptedData.mes = this.encrypt(pubkey, mes);
                if (!encryptedData.mes) {
                    return res.status(400).json({ error: 'Encryption failed for month.' });
                }
            }
            if (ano) {
                encryptedData.ano = this.encrypt(pubkey, ano);
                if (!encryptedData.ano) {
                    return res.status(400).json({ error: 'Encryption failed for year.' });
                }
            }
            if (cvv) {
                encryptedData.cvv = this.encrypt(pubkey, cvv);
                if (!encryptedData.cvv) {
                    return res.status(400).json({ error: 'Encryption failed for CVV.' });
                }
            }
            return encryptedData;
        } catch (error) {
            console.error('Encryption Error:', error);
            throw error;
        }
    }

    encrypt(modulusHex, plaintext) {
        try {
            const exponentHex = "10001";
            const rsaKey = new NodeRSA();
            rsaKey.importKey({
                n: hexToBytes(modulusHex),
                e: parseInt(exponentHex, 16),
            }, 'components-public');
            const publicKeyPEM = rsaKey.exportKey('public');
            const publicKeyDER = crypto.createPublicKey(publicKeyPEM);
            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: publicKeyDER,
                    padding: crypto.constants.RSA_PKCS1_PADDING,
                },
                Buffer.from(`${plaintext}`)
            );
            const encryptedData = encryptedBuffer.toString('base64')
            return encryptedData;
        } catch (error) {
            console.error('Encryption Error:', error);
            return null;
        }
    }
}

module.exports = VantivRSA;
