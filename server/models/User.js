const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String } // optional profile picture URL
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
