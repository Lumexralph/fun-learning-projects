// let obj = {
// 	name : "Lumex"
// };
//  let JSONString = JSON.stringify(obj);

//  console.log(typeof JSONString);
//  console.log(JSONString);

//  let JSONObject = JSON.parse(JSONString);
//  console.log(typeof JSONObject);
//  console.log(JSONObject);

const fs = require('fs');

let originalNote = {
	tile : "A kind of title",
	body : "A kind of body"
};

let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync("note.json", originalNoteString);

let noteString = fs.readFileSync("note.json");
let note = JSON.parse(noteString);

console.log(note)