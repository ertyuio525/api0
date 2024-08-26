const User = require('../models/user');

async function authenticate(req, res, next) {
    const authHeader = req.headers['enc-auth'];
    if (!authHeader) {
        return res.status(401).json({ message: 'You are not authorised to use this page.' });
    }

    const foundUser = await User.findById(authHeader);
    if (!foundUser) {
        return res.status(401).json({ message: 'You are not authorised to use this page.' });
    }

    next(); 
}

module.exports = authenticate;