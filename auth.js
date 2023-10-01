require('dotenv').config();
const JWT = require('jsonwebtoken');
const { jwtSecret } = require('./config');

const generateAccesToken = (user) => {
  return JWT.sign(user, jwtSecret, { expiresIn: '1h' });
};

module.exports = {
  generateAccesToken,
};
