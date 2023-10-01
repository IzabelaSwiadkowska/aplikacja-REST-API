const User = require('./users.model');
const {
  DuplicatedKeyError,
  UnknownDatabaseError,
} = require('../errorsHandlers');

const createUser = async ({ email, password }) => {
  try {
    const newUser = await User.create({ email, password });
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
const getUser = async ({ email, password }) => {
  try {
    return await User.findOne({ email });
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};
const updateUser = async ({ email }, userData) => {
  try {
    return await User.findOneAndUpdate({ email }, userData);
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};
module.exports = {
  getUser,
  createUser,
  updateUser,
};
