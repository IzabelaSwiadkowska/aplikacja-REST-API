require('dotenv').config();
const JWT = require('jsonwebtoken');
const { jwtSecret } = require('./config');

const generateAccessToken = (user) => {
  return JWT.sign(user, jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return JWT.verify(token, jwtSecret);
  } catch (e) {
    console.error(e);
    if (e instanceof JWT.TokenExpiredError) {
      throw new Error('Token expired');
    }
    if (e instanceof JWT.JsonWebTokenError) {
      throw new Error('Token is valid.');
    }
    throw new Error('Unknown tokane verification error.');
  }
};
module.exports = {
  generateAccessToken,
  verifyToken,
};
