const signupHandler = (req, res, next) => {
  return res.send({ message: 'Signup works!' });
};

module.exports = {
  signupHandler,
};
