const Contact = require('./contacts.model');

const listContacts = async (owner, page, limit, favorite) => {
  try {
    const filter = { owner };
    if (favorite !== undefined) {
      filter.favorite = favorite;
    }
    const result = await Contact.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Contact.count(filter);
    return {
      result,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const findContactbyId = async (owner, id) => {
  try {
    return await Contact.findOne({ _id: id, owner });
  } catch (e) {
    console.error(e.message);
  }
};

const addContact = async (owner, name, email, phone) => {
  try {
    return await Contact.create({ owner: owner, name, email, phone });
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const updateContact = async (owner, contactId, contact) => {
  try {
    return await Contact.findByIdAndUpdate(
      { _id: contactId, owner: owner },
      contact,
      { new: true }
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const removeContact = async (owner, contactId) => {
  try {
    return await Contact.findByIdAndRemove({ _id: contactId, owner });
  } catch (e) {
    console.error(e.message);
    return false;
  }
};

const updateStatusContact = async (owner, contactId, contact) => {
  try {
    return await Contact.findByIdAndUpdate(
      { _id: contactId, owner: owner },
      contact,
      { new: true }
    );
  } catch (e) {
    console.error(e.message);
    throw e;
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
