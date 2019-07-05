const fs = require('fs');

const fetchNote = () => {
	try {
		let noteString = fs.readFileSync('notes-data.json');
		return JSON.parse(noteString);
	}catch (e) {
		return [];
	}
};

const saveNote = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

let addNote = (title, body) => {
	let notes = fetchNote(),
		note = {
			title,
			body,
		};

		 if(!notes.some((el) => el.title === title)) {
		 	//if the title doesn't exist
		 	notes.push(note);
		 	saveNote(notes);
		 }
		 else {
		 	notes.forEach((el, index, arr) => {
		 		if(el.title === title) {
		 			el.body = body;
		 			saveNote(notes);
		 		}
		 	});
		 }

		 return notes;
}

let listAll = () => {
	const notes = fetchNote();
	const returnedNotes = {};

	//get and store all notes
	notes.forEach(( el ) => {
		const {title, body} = el;
		returnedNotes.title = title;
		returnedNotes.body = body;
	})

	
	return returnedNotes;
}

let readNote = (title) => {
	let notes = fetchNote();
	let note = notes.find((el) => el.title === title); 

	return note;
};

let deleteNote = (title) => {
	let notes = fetchNote();
	let newNotes = notes.filter((el) => el.title !== title);
	saveNote(newNotes);

	return notes.length !== newNotes.length; 
}

module.exports = {
	addNote,
	listAll,
	readNote,
	deleteNote
};