const { DuplicatedKeyError } = require('../errorsHandlers');
const service = require('./users.service');
const auth = require('../auth/auth.service');

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
    const isUserPasswordValid = await userEntity?.validatePassword(
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

const logoutHandler = async (req, res, next) => {
  try {
    const { email } = req.user;
    await service.updateUser(email, { token: null });
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
};

const currentHandler = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(200).send({ user: { email, subscription } });
  } catch (e) {
    return next(e);
  }
};

const subscriptionHandler = async (req, res, next) => {
  try {
    const result = await service.updateSubscription(req.body.email, req.body);
    if (result) {
      res.status(200).json({ result });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  subscriptionHandler,
};
