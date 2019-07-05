function onFocus (id) {
   document.getElementById(id).style.background = "blue";
}

function onBlur (id) {
   document.getElementById(id).style.background = "none";
}

//add event
var inputs = document.getElementsByTagName("input");

inputs[0].addEventListener("click", onFocus("box2"));