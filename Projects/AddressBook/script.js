const addNewContactButton = document.getElementById("addNewContact");
const contactBook = document.getElementById('contacts');
const cancelButton = document.getElementById("cancel");
const form = document.querySelector("form");
const contactMessageElement = document.querySelector(".contactAdded");

class AddressBook {
  constructor() {
    this.contactList = [];
  }

  save(contact) {
    this.contactList.push(contact);
  }

  displayAllContacts(id = "contacts") {
    let contacts = document.getElementById(id);

    // remove empty contact message if list is not empty
    if (this.contactList) {
      contacts.innerHTML = "";
    }

    this.contactList.forEach(function(contact, index) {
      let button = document.createElement("BUTTON");
      button.className = "contact";
      let buttonContent = document.createTextNode(
        `${contact.firstName} ${contact.lastName}`
      );
      button.appendChild(buttonContent);

      // create panel element
      let panel = document.createElement("DIV");
      panel.className = "panel";
      let panelContent = document.createElement("p");
      panelContent.innerHTML = `<p>${contact.email}</p> <p>${
        contact.phoneNumber
      }</p>
        <p>${contact.address}</p>
        <p>${contact.city}, ${contact.state}
        </p>
        `;
      panel.appendChild(panelContent);

      // add event
      button.addEventListener("click", function() {
        // remove the message added message if any
        contactMessageElement.style.display = "none";

        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });

      // add it to DOM
      contacts.appendChild(button);
      button.after(panel);
    });
  }

  addContact(element1, element2, element3, element4) {
    element1.style.display = "none";
    element2.style.display = "none";
    element3.style.display = "block";
    element4.style.display = 'none';
  }

  cancel(element1, element2, element3) {
    element1.style.display = "none";
    element2.style.display = "block";
    element3.style.display = 'block';
  }
}

// contact
class Contact {
  constructor(firstname, lastname, email, phonenumber, address, city, state) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.phoneNumber = phonenumber;
    this.address = address;
    this.city = city;
    this.state = state;
  }
}

const andelaAddressBook = new AddressBook();

// helper function to add new contact
const submitContact = event => {
  const newContactForm = document.forms.newContact.elements;
  const information = {};

  event.preventDefault();

  for (const input of newContactForm) {
    // get the form values
    if (input.id !== "submit") {
      information[input.id] = input.value ? input.value : "";

      // clean up the form when done
      input.value = "";
    }
  }
  const { firstName, lastName, email, phoneNumber, address, city, state } = information;

  // new contact
  const contact = new Contact(
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    city,
    state
  );

  andelaAddressBook.save(contact);
  andelaAddressBook.displayAllContacts();

  // enable the element to display the contacts and success message
  contactBook.style.display = 'block';
  addNewContactButton.style.display = "block";
  contactMessageElement.style.display = "block";

  // hide the contact form
  form.style.display = "none";
};

// Attach all events
addNewContactButton.addEventListener(
  "click",
  () =>
    andelaAddressBook.addContact(
      addNewContactButton,
      contactMessageElement,
      form,
      contactBook
    ),
  false
);

cancelButton.addEventListener("click", () =>
  andelaAddressBook.cancel(form, addNewContactButton, contactBook)
);

form.addEventListener("submit", submitContact);

document.body.addEventListener("load", andelaAddressBook.displayAllContacts);
