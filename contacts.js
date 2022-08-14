const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("db/contacts.json");

async function readList() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  const data = await readList();
  console.table(data);
}

async function getContactById(contactId) {
  try {
    const list = await readList();
    const result = list.find(
      (contacts) => contacts.id === contactId.toString()
    );
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const list = await readList();
    const result = list.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
    const newContacts = await readList();
    console.table(newContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await readList();
    const id = shortid.generate();

    const newContact = { id, name, email, phone };
    const createdNewList = [...list, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(createdNewList), "utf8");

    const newContactsList = await readList();
    console.table(newContactsList);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
