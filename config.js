require('dotenv').config();

const uriDb = process.env.DATABASE_URI;
const jwtSecret = process.env.SECRET_KEY;

module.exports = { uriDb, jwtSecret };
