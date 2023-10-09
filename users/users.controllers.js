const { DuplicatedKeyError } = require('../errorsHandlers');
const service = require('./users.service');
const auth = require('../auth/auth.service');
const jimp = require('jimp');
const mimetypes = require('mime-types');
const { v4 } = require('uuid');
const path = require('path');
const fs = require('fs/promises');
const User = require('./users.model');

const signupHandler = async (req, res, next) => {
  try {
    const result = await service.createUser(req.body);
    return res.status(201).send({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
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

const updateUserAvatarHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const avatarImage = await jimp.read(req.file.path);
    const resizedAvatar = avatarImage.resize(250, 250);
    await resizedAvatar.writeAsync(req.file.path);
    const fileName = `${email}_${v4()}.${mimetypes.extension(
      req.file.mimetype
    )}`;
    await fs.rename(
      req.file.path,
      path.join(__dirname, '..', 'public/avatars', fileName)
    );

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        avatarURL: `${req.protocol}://${req.headers.host}/avatars/${fileName}`,
      },
      { new: true }
    );
    if (updatedUser) {
      return res.status(200).send({ result: updatedUser.avatarURL });
    } else {
      return res.status(401).send({ message: 'Not authorized' });
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
  updateUserAvatarHandler,
};
