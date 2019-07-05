let express = require("express");
let _ = require("lodash");
//using configuration module for configuration credentials
let config = require("config");
let app = express();
app.listen(config.port);

let taskList = [];
app.get("/list", function(request, response) {
	response.send(taskList);
});

let bodyParser = require("body-parser")
app.use(bodyParser.json());

app.post("/task", [validationMiddleware, function(request, response) {
	taskList.push(request.body.task);
	response.send(taskList);
}]);

//update the page
app.put("/task/:task_index", [validationMiddleware, function(request, response) {
	let taskIndex = request.params.task_index;
	taskList[taskIndex] = request.body.task;
	response.send(taskList);
}]);

//delete
app.delete("/task/:task_index", function(request, response) {
	let taskIndex = request.params.task_index;
	taskList.splice(taskIndex, 1);
	response.send(taskList);
});
//providing a middleware for validation
function validationMiddleware(request, response, next) {
	if(_.isEmpty(request.body.task)) {
		return response.status(422).send("Task is empty");
	}
	return next();
}



//time for some unit test for the app

