/* eslint-disable no-useless-return */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const user = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
});

user.pre('save', async function () {
  if (!this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
user.methods.validatePassword = function (password) {
  console.log(password, this.password);
  console.log('compare', bcrypt.compare(password, this.password));
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model('user', user);
module.exports = User;
