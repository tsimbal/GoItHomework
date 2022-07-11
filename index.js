const contacts = require("./contacts");
// const argv = require('yargs').argv;
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ id, action, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.log(list);
      break;
    case "get":
      const contactById = await contacts.getContactById(id);
      console.log(contactById);
      break;
    case "add":
      const addedContact = await contacts.addContact({ name, phone, email });
      console.log(addedContact);
      break;
    case "remove":
      const removedById = await contacts.removeContact(id);
      console.log(removedById);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
};

// invokeAction({ action: 'remove', id: '1' });
invokeAction({
  action: "add",
  name: "test",
  email: "test@gmail.com",
  phone: "65465465",
});
// invokeAction(argv);
