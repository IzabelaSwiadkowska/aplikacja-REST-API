class DuplicatedKeyError extends Error {
  constructor(keyName, value) {
    super(`${keyName} in use. ${value} is already taken.`);
  }
}

class UnknownDatabaseError extends Error {
  constructor() {
    super(` Oops, something went wrong at database layer.`);
  }
}

module.exports = {
  DuplicatedKeyError,
  UnknownDatabaseError,
};
