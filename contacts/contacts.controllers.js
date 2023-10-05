const service = require('./contacts.service');

const getContactsHandler = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const contactList = await service.listContacts(
      req.user,
      page,
      limit,
      favorite
    );
    res.json(contactList);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getContactbyIdHandler = async (req, res, next) => {
  try {
    const contact = await service.findContactbyId(
      req.user,
      req.params.contactId
    );
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const createNewContactHandler = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await service.addContact(req.user, name, email, phone);
    if (newContact) {
      res.status(201).send({ newContact });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateContactHandler = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await service.updateContact(
      req.user,
      contactId,
      req.body
    );
    if (updatedContact) {
      res.status(200).send(updatedContact);
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeContactHandler = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isDeleted = await service.removeContact(req.user, contactId);
    if (isDeleted) {
      res.status(200).json({ message: 'contact deleted' });
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const UpdateStatusContactHandler = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedStatusContact = await service.updateStatusContact(
      req.user,
      contactId,
      req.body.favorite
    );
    if (updatedStatusContact) {
      res.status(200).json({ updatedStatusContact });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  getContactsHandler,
  getContactbyIdHandler,
  createNewContactHandler,
  updateContactHandler,
  removeContactHandler,
  UpdateStatusContactHandler,
};
