const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().optional(),
  subscription: Joi.string().optional(),
});

const usersValidationMiddleware = (req, res, next) => {
  const contact = req.body;

  const { error } = userSchema.validate(contact);
  if (error) {
    return res.status(400).send({ error: error.message });
  }
  return next();
};

module.exports = usersValidationMiddleware;
