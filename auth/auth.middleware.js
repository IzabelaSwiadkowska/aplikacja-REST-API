const auth = require('./auth.service');
const service = require('../users/users.service');

const extractTokenFromHeaders = (headers) => {
  return headers.authorization?.replace('Bearer ', '');
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = extractTokenFromHeaders(req.headers);
    if (!token) {
      throw new Error('AUthorization token is missing.');
    }
    const { email } = auth.verifyToken(token);
    const userEntity = await service.getUser(email);
    if (!userEntity || userEntity.token !== token) {
      throw new Error('Token is invalid.');
    }
    req.user = userEntity;
    return next();
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

module.exports = {
  authMiddleware,
};
