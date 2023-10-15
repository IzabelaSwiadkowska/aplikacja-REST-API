const sgMail = require('@sendgrid/mail');
const { apiKey } = require('../config');

sgMail.setApiKey(apiKey);

const sendMail = async (options) => {
  try {
    await sgMail.send(options);
  } catch (e) {
    console.error(e);
    throw new Error('Mail sending failed!');
  }
};

module.exports = {
  sendMail,
};
