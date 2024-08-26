const UserModel = require('../db/userModel');
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(id) {
    this._id = uuidv4(); // Generate random UUID for _id
    this.id = id
  }

  async save() {
    try {
      const user = new UserModel({
        _id: this._id, // Assign the generated UUID to _id
      });
      await user.save();
      console.log('User saved:', user);
    } catch (err) {
      console.error('Error saving user:', err);
    }
  }

  static async findById(id) {
    try {
      const user = await UserModel.findById(id);
      return user ? user : null;
    } catch (err) {
      console.error('Error finding user:', err);
      return null;
    }
  }

  displayInfo() {
    console.log(`User ID: ${this._id}`);
  }
}

module.exports = User;
