const encryptCardData441 = require('../../encryption/adyen/adyen-4.4.1/encrypt');
const encryptCardData511 = require('../../encryption/adyen/adyen-5.11.0/index');
const encryptCardData450 = require('../../encryption/adyen/adyen-4.5.0/encrypt');

async function Adyen(req, res, next) {
    const { adyenkey, card, month, year, cvv,version,ppkey,domain} = req.body;

    if (!adyenkey) {
        return res.status(400).json({ error: 'Missing required `PUBLIC ADYEN KEY`.' });
    }

    try {
        switch (version) {
            case '25':
                encryptedData = encryptCardData511(card, month, year, cvv, adyenkey );
                req.encryptedData = encryptedData;
                next();
                break;
            case 'v4':
                encryptedData = encryptCardData441(card, month, year, cvv, adyenkey );
                req.encryptedData = encryptedData;
                next();
                break;
            case 'v2':
                encryptedData = encryptCardData450(card, month, year, cvv, adyenkey, ppkey, domain );
                req.encryptedData = encryptedData;
                next();
                break;
            default:
                return res.status(400).json({ error: 'Invalid version specified in payload' });
        }
    } catch (error) {
        console.error('Encryption Error:', error);
        return res.status(500).json({ status: false, error_message: error.message });
    }
}

module.exports = Adyen;



// const encryptCardData = require('../../encryption/adyen/adyen-4.5.0/encrypt');
// async function Adyen450(req, res, next) {
//     const { pubkey, cc, mes, ano, cvv, ppkey, domain } = req.body;

//     if (!pubkey) {
//         return res.status(400).json({ error: 'Missing required `PUBLIC ADYEN KEY`.' });
//     }

//     try {
//         const encryptedData = encryptCardData({ cc, mes, ano, cvv, pubkey, ppkey, domain });
//         req.encryptedData = encryptedData;
//         next();
//     } catch (error) {
//         console.error('Encryption Error:', error);
//         return res.status(500).json({ status: false, error_message: error.message });
//     }
// }

// module.exports = Adyen450;



// const encryptCardData = require('../../encryption/adyen/adyen-5.11.0/index');
// async function Adyen5110(req, res, next) {
//     const { pubkey, cc, mes, ano, cvv } = req.body;

//     if (!pubkey) {
//         return res.status(400).json({ error: 'Missing required `PUBLIC ADYEN KEY`.' });
//     }

//     try {
//         const encryptedData = encryptCardData({ cc, mes, ano, cvv, pubkey });
//         req.encryptedData = encryptedData;
//         next();
//     } catch (error) {
//         console.error('Encryption Error:', error);
//         return res.status(500).json({ status: false, error_message: error.message });
//     }
// }

// module.exports = Adyen5110;


// // const card = '4242424242424242';
// // const month = '12';
// // const year = '2023';
// // const cvc = '123';

// // const adyenKey = "10001|A6FB4F53CB5DAD98B6AE1108F8E4C02C43981293D76994F84D363619811F94E43BA1E77408304D93A1457FCB9CEECC2506215CD9B626D878F3023A3EA93A67F72AF3E234CCF309790173D2275F21C3A471C8D7D8B5E83801A28D4221164EA48A23CE7D3E935D94D199D51FD4DC8C774E47C1F50E6E62B7FA6D6F38741B35969DA4B35CD869D39AB5F1C35F1AF37D94506B48AFE61D2A068F6848DBE1B297977EE8FC589E1EDB5BE34573DE9D2CDACA142F53ACE5B1E26045183287A37C2955C5A156603E726BF27FF59076EFEC3A840FB4C2DEDF9A5B9FCE5F5939F41C1B695168D9688156437ADD26DC264FDC3D6E867E0EF8D72F4C4AAF071FB4E4897F4F39";

// // console.log(
// //     encryptCardData(
// //         card,
// //         month,
// //         year,
// //         cvc,
// //         adyenKey
// //     )
// // )