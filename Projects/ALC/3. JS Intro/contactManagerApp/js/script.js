// contact manager
let cm;

const init = () => {
  // create an intance of the contact manager
  cm = new ContactManager();

  cm.addTestData();
  cm.printContactsToConsole();

  // Display contacts in a table
  // pass the id of the HTML element that will contain the table
  cm.displayContactsAsATable("contacts")
}

// after the DOM has loaded
window.onload = init;


class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

// template for who manages the contacts
class ContactManager {
  constructor() {
    this.listOfContacts = [];
  }

  addTestData() {
		let c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
    let c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
    let c3 = new Contact("Angus Young", "angus@acdc.com");
    let c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of contacts by Name
		this.sort();
	}

  add(contact) {
    this.listOfContacts.push(contact);
  }

  remove(contact) {
    // iterate through the list of contacts
    // anyone that matches is removed
    for (let i = 0; i < this.listOfContacts.length; i++) {
      const c = this.listOfContacts[i];

      if (c.email === contact.email) {
          // remove the contact at index
          this.listOfContacts.splice(i, i);
          // stop looking through the contacts
          break;
      }
      
    }
  }

  printContactsToConsole() {
    this.listOfContacts.forEach((el, index, array) => {
      console.log(el.name);
    });
  }

  sort() {
      // As our array contains objects, we need to pass as argument
      // a method that can compare two contacts.
      // we use a class method, which is similar to the distance(p1, p2)
      // method we saw in the ES6 Point class in module 4
      // We always call such methods using the name of the class followed
      // by the dot operator
      this.listOfContacts.sort(ContactManager.compareByName);
  }

  save() {
    // We can only save strings in local storage
    // convert the array(objects) to strings
    localStorage.contacts = JSON.stringify(this.listOfContacts);
    
  }

  empty() {
    this.listOfContacts = [];
  }

  load() {
    if (localStorage.contacts !== undefined) {
      // our contacts exists laod it 
      this.listOfContacts = JSON.parse(localStorage.contacts);      
    }

  }

  displayContactsAsATable(idOfContainer) {
    // to empty the container that contains
    // the result
    let container = document.querySelector(`#${idOfContainer}`);
    container.innerHTML = '';

    if (this.listOfContacts.length === 0) {
        container.innerHTML = '<p>No contacts to display!</p>';
        // stops the execution
        return;
    }

    //creates and populates the table with users
    let table = document.createElement('table');

    // iterates on the array of users
    this.listOfContacts.forEach((currentContact, index, array) => {
        // creates a row
        let row = table.insertRow();

        row.innerHTML = `<td>${currentContact.name}</td>
                         <td>${currentContact.email}</td>`;
    });
    // add the table to the DOM(div)
    container.appendChild(table);
  }

  static compareByName(c1, c2) {
    if (c1.name < c2.name) {
      return -1;
    }
    if (c1.name > c2.name) {
      return 1;
    }
    // if equal
    return 0;
  }

}

// handle form submission
const formSubmitted = () => {
  // get values from input fields
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');

  let newContact = new Contact(name.nodeValue. email.value);
  cm.add(newContact);

  // Empty the input fields
  name.value = '';
  email.value = '';

  // refresh the table
  cm.displayContactsAsATable('contacts'); 

  // do submit using the default method http
  return false;
}

// add event to form
const form = document.querySelector('form');

form.addEventListener('submit', formSubmitted);
