// src/server/Server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { setupRoutes } = require('./routes.js');
const connectDB = require('../db/connection.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');

export class Server {
    constructor() {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.port = 3000;
    }

    start() {
        setupRoutes(this.app);
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
