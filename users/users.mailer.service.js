const { sendMail } = require('../mailer.service/mailer.service');
const { sendgridUser } = require('../config');

const sendUserVerificationMail = async (email, verificationToken) => {
  const mailOptions = {
    to: email,
    from: sendgridUser,
    subject: 'Welcome to our site!',
    text: `Hello! Please verify your account by visiting http://localhost:3000/users/verify/${verificationToken}`,
    html: `<h2>Hello!</h2><br/>Please verify your account by clicking <a href="http://localhost:3000/users/verify/${verificationToken}">here</a>!`,
  };

  await sendMail(mailOptions);
};
module.exports = {
  sendUserVerificationMail,
};
