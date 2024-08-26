const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://bruxo:mypassword123@bruxo.ztkst.mongodb.net/SiteDB?retryWrites=true&w=majority&appName=bruxo', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;
