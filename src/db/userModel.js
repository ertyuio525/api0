// src/db/userModel.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Set default value to generate random UUID
  },
  username: {
    type: String,
    required: true,
  }
  // Other user fields...
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;