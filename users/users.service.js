const User = require('./users.model');
const { v4: uuid } = require('uuid');
const {
  DuplicatedKeyError,
  UnknownDatabaseError,
} = require('../errorsHandlers');
const gravatar = require('gravatar');

const createUser = async ({ email, password }) => {
  try {
    const avatarURL = gravatar.url(`${email}`, { default: 'identicon' }, true);
    const verificationToken = uuid();
    const newUser = await User.create({
      email,
      password,
      avatarURL,
      verificationToken,
      verify: false,
    });
    return newUser;
  } catch (e) {
    console.error(e);

    if (e.code === 11000) {
      const [[key, value]] = Object.entries(e.keyValue);
      throw new DuplicatedKeyError(key, value);
    }

    throw new UnknownDatabaseError();
  }
};
const getUser = async (filter) => {
  try {
    return await User.findOne(filter);
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};
const updateUser = async (email, userData) => {
  try {
    return await User.findOneAndUpdate({ email }, userData);
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};

const updateSubscription = async (email, subscription) => {
  try {
    return await User.findOneAndUpdate(email, subscription, {
      new: true,
    });
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};

const updateUserAvatar = async (email, avatarURL) => {
  try {
    return await User.findOneAndUpdate(email, avatarURL, {
      new: true,
    });
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};
module.exports = {
  getUser,
  createUser,
  updateUser,
  updateSubscription,
  updateUserAvatar,
};
