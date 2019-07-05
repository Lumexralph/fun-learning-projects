var express = require("express");

var app = express();
var port  = 8081;

app.use(requestListener).listen(port);

function requestListener(request, response) {
	console.log("responding now.....");
	response.send("Hello Lumex");
}