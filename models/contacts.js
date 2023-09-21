const fs = require('fs').promises;
const contactsPath = './models/contacts.json';
const { v4 } = require('uuid');

const updateContacts = async (data) => {
  const contacts = JSON.stringify(data);
  await fs.writeFile(contactsPath, contacts);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};
const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactId = String(id);
  const result = contacts.find((item) => item.id === contactId);
  return result;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  const [contact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name: name, email: email, phone: phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  if (!contact) {
    return;
  }
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  await updateContacts(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
