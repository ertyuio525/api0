// src/index.js
const express = require('express');
const path = require('path');
const setupRoutes = require('../src/server/routes.js')
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;
const connectDB = require('./db/connection.js');
const User = require('./models/user.js');
const mongoose = require('mongoose');


(async () => {
    await connectDB();
})();


// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// setupRoutes();
// Setup routes
app.use('/', setupRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
