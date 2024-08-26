// src/server/routes.js
const { V1RouteHandler, Cybersource } = require('./Handlers/V1RouteHandler');
const { V2RouteHandler, CyberV2 } = require('./Handlers/V2RouteHandler');
const { PayeezyHandler, Payeezy } = require('./Handlers/PayeezyRouteHandler');
const { VantivHandler, Vantiv } = require('./Handlers/VantivRouteHandler');
const { AdyenHandler, Adyen } = require('./Handlers/AdyenRouteHandler');
const { CloverRouteHandler, Clover } = require('./Handlers/CloverRouteHandler');

const authenticate = require('../middleware/authentication');
const path = require('path');
const express = require('express');
const router = express.Router();

function setupRoutes() {
    const v1RouteHandler = new V1RouteHandler();
    const v2RouteHandler = new V2RouteHandler();
    const payeezyhndlr = new PayeezyHandler();
    const vantivhndlr  = new VantivHandler();
    const adyenhndlr  = new AdyenHandler();
    const cloverhndlr  = new CloverRouteHandler();

    // Add middleware functions to the V1 route
    router.post('/v1', authenticate, Cybersource, v1RouteHandler.handle.bind(v1RouteHandler));
    router.post('/v2', authenticate, CyberV2, v2RouteHandler.handle.bind(v2RouteHandler));
    router.post('/payeezy', authenticate, Payeezy, payeezyhndlr.handle.bind(payeezyhndlr));
    router.post('/vantiv', authenticate, Vantiv, vantivhndlr.handle.bind(vantivhndlr));
    router.post('/adyen', authenticate, Adyen, adyenhndlr.handle.bind(adyenhndlr));
    router.post('/clover', authenticate, Clover, cloverhndlr.handle.bind(cloverhndlr));

    router.get('/cybersource', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/cybersource.html'));
    });

    router.get('/cybersourcev2', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/cybersourcev2.html'));
    });

    router.get('/payeezy', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/payeezy.html'));
    });

    router.get('/vantiv', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/vantiv.html'));
    });

    router.get('/adyen', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/adyen.html'));
    });
    
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    return router;
}

module.exports = setupRoutes;
