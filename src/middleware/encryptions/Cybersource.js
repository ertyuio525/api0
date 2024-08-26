const { CybersourceSHA256, CybersourceSHA1, Cybersourcen1, Cybersourcen2 } = require('../../encryption/CybersourceRSA.js');

async function Cybersource(req, res, next) {
    const { pubkey, cc, mes, ano, cvv, version } = req.body;

    if (!pubkey) {
        return res.status(400).json({ error: 'Missing required `PUBLIC KEY`.' });
    }

    let cryptoHelper;

    switch (version) {
        case '1':
            cryptoHelper = new CybersourceSHA256();
            break;
        case '2':
            cryptoHelper = new CybersourceSHA1();
            break;
        case 'n1':
            cryptoHelper = new Cybersourcen1();
            break;
        case 'n2':
            cryptoHelper = new Cybersourcen2();
            break;
        default:
            return res.status(400).json({ error: 'Invalid version specified in payload' });
    }

    try {
        const encryptedData = cryptoHelper.encryptData({ pubkey, cc, mes, ano, cvv });
        req.encryptedData = encryptedData;
        req.version = version;
        next();
    } catch (error) {
        console.error('Encryption Error:', error);
        return res.status(500).json({ status: false, error_message: error.message });
    }
}

module.exports = Cybersource;


