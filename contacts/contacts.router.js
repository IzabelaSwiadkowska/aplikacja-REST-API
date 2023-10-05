const express = require('express');
const contactsRouter = express.Router();
const controller = require('./contacts.controllers');
const { authMiddleware } = require('../auth/auth.middleware');
const {
  contactsValidationMiddleware,
  statusValidationMiddleware,
} = require('./contacts.validators');

contactsRouter.get('/', authMiddleware, controller.getContactsHandler);
contactsRouter.get(
  '/:contactId',
  authMiddleware,
  controller.getContactbyIdHandler
);
contactsRouter.post(
  '/',
  authMiddleware,
  contactsValidationMiddleware,
  controller.createNewContactHandler
);
contactsRouter.put(
  '/:contactId',
  authMiddleware,
  contactsValidationMiddleware,
  controller.updateContactHandler
);
contactsRouter.delete('/:contactId', controller.removeContactHandler);
contactsRouter.patch(
  '/:contactId/favorite',
  authMiddleware,
  statusValidationMiddleware,
  controller.UpdateStatusContactHandler
);

module.exports = contactsRouter;
