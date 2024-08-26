// src/server/V1RouteHandler.js
const Clover = require('../../middleware/encryptions/Clover');

class CloverRouteHandler {
    constructor() { }

    async handle(req, res) {
        res.json({ status: true, ...req.encryptedData, version: req.version, author: '@OriginalAni' });
    }
}

module.exports = {
    CloverRouteHandler,
    Clover
};