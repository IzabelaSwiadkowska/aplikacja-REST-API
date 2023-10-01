const { DuplicatedKeyError } = require('../errorsHandlers');
const service = require('./users.service');
const auth = require('../config');

const signupHandler = async (req, res, next) => {
  try {
    const result = await service.createUser(req.body);
    return res.status(201).send({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (e) {
    const { message } = e;
    if (e instanceof DuplicatedKeyError) {
      return res.status(409).send({ message });
    }
    return next(e);
  }
};
const loginHandler = async (req, res, next) => {
  try {
    const userEntity = await service.getUser(req.body.email);
    const isUserPasswordValid = await userEntity.validatePassword(
      req.body.password
    );
    if (!userEntity || !isUserPasswordValid) {
      return res.status(401).send({ message: 'Wrong credentials.' });
    }

    const userPayload = {
      email: userEntity.email,
      subscription: userEntity.subscription,
    };

    const token = auth.generateAccessToken(userPayload);
    await service.updateUser(userEntity.email, { token });

    return res.status(200).send({
      user: userPayload,
      token,
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  signupHandler,
  loginHandler,
};
