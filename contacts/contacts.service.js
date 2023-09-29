const Contact = require('./contacts.model');

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (e) {
    console.error(e.message);
  }
};

const findContactbyId = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (e) {
    console.error(e.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    return await Contact.create({ name, email, phone });
  } catch (e) {
    console.error(e.message);
  }
};

const updateContact = async (contactId, contact) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, contact, { new: true });
  } catch (e) {
    console.error(e.message);
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove(contactId);
  } catch (e) {
    console.error(e.message);
  }
};

const updateStatusContact = async (contactId, contact) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, contact, { new: true });
  } catch (e) {
    console.error(e.message);
  }
};
module.exports = {
  listContacts,
  findContactbyId,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
