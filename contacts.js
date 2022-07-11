const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf8');

  if (!result) return null;

  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const foundContactById = contactList.find((el) => el.id === contactId);

  if (!foundContactById) return null;

  return foundContactById;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();

  const idx = contactList.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;

  const [result] = contactList.splice(idx, 1);
  await updateList(contactList);

  return result;
};

const addContact = async (data) => {
  const list = await listContacts();
  const newContact = { id: nanoid(), ...data };

  list.push(newContact);
  await updateList(list);

  return newContact;
};

const updateList = async (data) => {
  const stringifyData = JSON.stringify(data, null, 2);

  return await fs.writeFile(contactsPath, stringifyData);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
