const CloverRSA = require('../../encryption/CloverRSA');

async function Clover(req, res, next) {
    const { TA_DEV_KEY, cc, mes, ano, cvv } = req.body;
    console.log(req.body)
    if (!TA_DEV_KEY) {
        return res.status(400).json({ error: 'Missing required `PUBLIC KEY`.' });
    }

    const cryptoHelper = new CloverRSA();

    try {
        const encryptedData = cryptoHelper.encryptData({ TA_DEV_KEY, cc, mes, ano, cvv });
        req.encryptedData = encryptedData;
        next();
    } catch (error) {
        console.error('Encryption Error:', error);
        return res.status(500).json({ status: false, error_message: error.message });
    }
}

module.exports = Clover;
