const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().optional(),
  subscription: Joi.string().optional(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const subscriptionValidationMiddleware = (req, res, next) => {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.message });
  }
  return next();
};
const usersValidationMiddleware = (req, res, next) => {
  const contact = req.body;

  const { error } = userSchema.validate(contact);
  if (error) {
    return res.status(400).send({ error: error.message });
  }
  return next();
};

module.exports = {
  usersValidationMiddleware,
  subscriptionValidationMiddleware,
};
