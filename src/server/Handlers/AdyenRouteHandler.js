// src/server/AdyenRouteHandler.js
const Adyen = require('../../middleware/encryptions/adyen');
const RiskData = require('../../encryption/adyen/riskData/risk')

class AdyenHandler {
    constructor() { }

    async handle(req, res) {
        res.json({ status: true, ...req.encryptedData,riskData: RiskData(), author: '@OriginalAni' });
    }
}

module.exports = {
    AdyenHandler,
    Adyen
};