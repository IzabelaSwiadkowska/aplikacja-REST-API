const express = require('express');
const contactsRouter = express.Router();
const controller = require('./contacts.controllers');
const {
  contactsValidationMiddleware,
  statusValidationMiddleware,
} = require('./contacts.validators');

contactsRouter.get('/', controller.getContactsHandler);
contactsRouter.get('/:contactId', controller.getContactbyIdHandler);
contactsRouter.post(
  '/',
  contactsValidationMiddleware,
  controller.createNewContactHandler
);
contactsRouter.put(
  '/:contactId',
  contactsValidationMiddleware,
  controller.updateContactHandler
);
contactsRouter.delete('/:contactId', controller.removeContactHandler);
contactsRouter.patch(
  '/:contactId/favorite',
  statusValidationMiddleware,
  controller.UpdateStatusContactHandler
);

module.exports = contactsRouter;
