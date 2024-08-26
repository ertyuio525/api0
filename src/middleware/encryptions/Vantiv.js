const VantivRSA = require('../../encryption/VantivRSA');

async function Vantiv(req, res, next) {
    const { pubkey, cc, mes, ano, cvv } = req.body;

    if (!pubkey) {
        return res.status(400).json({ error: 'Missing required `PUBLIC MODULUS KEY`.' });
    }

    const cryptoHelper = new VantivRSA();

    try {
        const encryptedData = cryptoHelper.encryptData({ pubkey, cc, mes, ano, cvv });
        req.encryptedData = encryptedData;
        next();
    } catch (error) {
        console.error('Encryption Error:', error);
        return res.status(500).json({ status: false, error_message: error.message });
    }
}

module.exports = Vantiv;
