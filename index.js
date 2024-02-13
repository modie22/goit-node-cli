const { program } = require("commander");
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactsList = await contacts.listContacts();
            return console.table(contactsList)

        case "get":
            const oneContact = await contacts.getContactById(id);
            return console.log('oneContact', oneContact)

        case "add":
            const addContact = await contacts.addContact({ name, email, phone });
            return console.log('addContact', addContact)

        case "remove":
            const removeContact = await contacts.removeContact(id);
            return console.log('removeContact', removeContact)

        default:
        console.warn("\x1B[31m Unknown action type!");
    }
}

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone")

program.parse(process.argv);

const options = program.opts();

invokeAction(options);