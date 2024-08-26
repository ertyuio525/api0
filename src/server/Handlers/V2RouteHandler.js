// src/server/V2RouteHandler.js
const CyberV2 = require('../../middleware/encryptions/CybersourceV2');

class V2RouteHandler {
    constructor() { }

    async handle(req, res) {
         res.json({ status: true, ...req.encryptedData, author: '@OriginalAni' });
    }
}

module.exports = {
    V2RouteHandler,
    CyberV2
};