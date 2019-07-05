console.log("Starting App.js");

const fs = require("fs");
const _ = require("lodash");
const yargs = require('yargs');
const notes = require('./note.js');

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
};

const argv = yargs
			.command('add', 'Add a new note', {
				title: titleOptions,
				body: bodyOptions
			})
			.command('lst', 'list all notes')
			.command('read', 'read a note', {
				title: titleOptions
				})
			.command('remove', 'remove a note', {
				title: titleOptions
				})
			.help()
			.argv;
const command = argv._[0];

console.log(`yargs ${JSON.stringify(argv)}`);
console.log("Process", process.argv);

console.log(`Command: ${command}`);

if (command == "add") {
	console.log("Adding new note");
	let note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log("Note Created!");
		note.forEach((el) => {
			console.log(`${el.title} : ${el.body}`);
		});
	}
	else {
		console.log("Error creating note");
	}
}
else if (command === "list") {
	notes.listAll();
}
else if (command === "read") {
	let note = notes.readNote(argv.title);
	debugger;
	note ? (console.log(`Title: ${note.title}`), console.log(`Body: ${note.body}`) )
		 : console.log("Note not found.");	
}
else if (command === "remove") {
	let removed = notes.deleteNote(argv.title);
	let message = removed ? "Note successfully removed" : "Note not removed";

  console.log(message);
}
else if (command === "allnotes") {
	const allNotes = notes.listAll();
	const message = allNotes.title ? allNotes : "Can't find any note";

	console.log(message);
}