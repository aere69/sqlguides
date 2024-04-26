const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String
});

// Create a collection 'user' in MongoDB
const User = mongoose.model('user', UserSchema);

module.exports = User;