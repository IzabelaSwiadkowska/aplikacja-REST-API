require('dotenv').config();

const uriDb = process.env.DATABASE_URI;
const jwtSecret = process.env.SECRET_KEY;
const apiKey = process.env.SENDGRID_API_KEY;
const sendgridUser = process.env.SENGRID_USER;
const sendgridRecipient = process.env.SENGRID_RECIPIENT;
const serverPort = process.env.PORT || 3000;

module.exports = {
  uriDb,
  jwtSecret,
  apiKey,
  sendgridRecipient,
  sendgridUser,
  serverPort,
};
