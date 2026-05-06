// src/index.js

const express = require('express');
const path = require('path');


const setupRoutes = require('./server/routes'); // تأكد إنه بيرجع router

const app = express();

// ✅ مهم جدًا لـ Heroku
const PORT = process.env.PORT || 3000;

// 🔹 Connect Database
(async () => {
    try {
        await connectDB();
        console.log("Database connected");
    } catch (err) {
        console.error("DB connection error:", err);
    }
})();

// 🔹 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Static files
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Routes
app.use('/', setupRoutes);

// 🔹 Test route (اختياري)
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

// 🔹 Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
