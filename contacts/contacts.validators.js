const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

const statusSchema = Joi.object({
  favorite: Joi.boolean(),
});

const statusValidationMiddleware = (req, res, next) => {
  const contact = req.body;

  const { error } = statusSchema.validate(contact);
  if (error) {
    return res.status(400).send({ error: 'missing favorite field' });
  }
  return next();
};
const contactsValidationMiddleware = (req, res, next) => {
  const newContact = req.body;

  const { error } = contactsSchema.validate(newContact);

  if (error) {
    return res.status(400).send({ error: error.message });
  }
  return next();
};

module.exports = {
  contactsValidationMiddleware,
  statusValidationMiddleware,
};
