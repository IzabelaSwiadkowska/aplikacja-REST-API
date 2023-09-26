const express = require('express');
const router = express.Router();
const controller = require('../controller');

router.get('/', controller.getContacts);

router.get('/:contactId', controller.getContactById);

router.post('/', controller.createNewContact);

router.delete('/:contactId', controller.deleteContact);

router.put('/:contactId', controller.updateContact);

router.patch('/:contactId/favorite', controller.updateStatusContact);

module.exports = router;
