let chai = require("chai"),
	expect = chai.expect,
	should = chai.should();

let request = require("request");
let config = require("config");
//using config module to create a local domain
GLOBAL.domain = `http://${config.host}:${config.port}`;
describe('---Testing the task list api---', function() {
	it('GET: Task list', function(done) {
		let options = {
			url : `${domain}/task`,
			headers : {
				"Content-Type": "application/json"
			},
			json : {
				task : "Hello Lumex"
			},
		};

		request.post(options, function(error, response, body) {
			console.log("we got a response", body);
			done();
		});
	});
});
