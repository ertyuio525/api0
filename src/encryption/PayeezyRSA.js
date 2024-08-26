const crypto = require('crypto');

class PayeezyRSA {
    constructor() {}

    encryptData({ pubkey, cc, mes, ano, cvv }) {
        try {
            if (ano.length === 4) {
                ano = ano.slice(2);
            }
            const card_data = {
                card: cc,
                cvv: cvv,
                exp: `${mes}${ano}`,
                name: "John bhai"
            };
            const cardDataString = JSON.stringify(card_data);
            const encryptedData = {};

            if (cc) {
                encryptedData.encryptedData = this.encrypt(pubkey, cardDataString);
                if (!encryptedData.encryptedData) {
                    throw new Error('Encryption failed for credit card data');
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
            const pubkeyPEM = Buffer.from(pubkey, "base64").toString("utf8");
            const pubkeyDER = crypto.createPublicKey(pubkeyPEM);
            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: pubkeyDER,
                    padding: crypto.constants.RSA_PKCS1_PADDING,
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

module.exports = PayeezyRSA;
