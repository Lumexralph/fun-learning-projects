
// Replacing the backslash created by
// my text editor on windows with
//forward slash  "/"

const replaceSlash = (str) => str.replace(/\\/g, "/");
module.exports = {
	replaceSlash: replaceSlash,
	//askInput: replaceSlash(String.raw`${prompt("What file path? ")}`)
};