//LET'S CREATE A ROUTER COMPONENTS
//TO HANDLE DIFFERENT REQUESTS
//INSTEAD OF USING NESTED IF/ELSE WHEN 
//CREATING THE HTTP SERVER

const Router = module.exports = function() {
	this.routes = [];
}

Router.prototype.add = function(method, url, handler) {
	this.routes.push({method: method,
					  url: url,
					  handler: handler		});
};

Router.prototype.resolve = function(request, response) {
	let path = require("url").parse(request.url).pathname;

	return  this.routes.some(function(route) {
		let match = route.url.exec(path);
		if(!match || route.method != request.method) {
			return false;
		}

		let urlParts = match.slice(1).map(decodeURIComponent);
		route.handler.apply(null, [request, response]
									.concat(urlParts));

		return true;
	});
};

//creating a file server

let http = require("http");
let Router = require("./router");
let ecstatic = require("ecstatic");

let fileServer = ecstatic({root: "./Projects"});

let router = new Router();

http.createServer(function(request, response) {
	if(!router.resolve(request, response)) {
		fileServer(request, response);
	}
}).listen(8000);

function respond(response, status, data, type) {
	response.writeHead(status, {"Content-Type": type || "text/plain"});

	response.end(data);
}

function respondJSON(response, status, data) {
	respond(response, status, JSON.stringify(data), 
				"application/json");
}

let talks = Object.create(null);

router.add("GET", /^\/talks\/([^\/]+)$/, 
			function(request, response, title) {
				if(title in talks) {
					respondJSON(response, 200, talks[title]);
				}
				else {
					respond(response, 404, `No talk ${title} found`);
				}
			});

router.add("DELETE", /^\/talks\/([^\/]+)$/, 
			function(request, response, title) {
				if(title in talks) {
					delete talks[title];
					registerChange(title);
				}

				respond(response, 204, null);
			});


function readStreamAsJSON(stream, callback) {
	let data = "";
	stream.on("data", function(chunk) {
		data += chunk;
	});

	stream.on("end", function() {
		let result, error;

		try {
			result = JSON.parse(data);
		}
		catch(e) {
			error = e;
		}

		callback(error, result);
	});

	stream.on('error', function(error) {
		callback(error);
	});
}


router.add("PUT", /^\/talks\/([^\/]+)$/, 
			function(request, response, title) {
				readStreamAsJSON(request, function(error, talk) {
					if(error) {
						respond(response, 400, error.toString());
					}
					else if(!talk || typeof talk.presenter != "string"
								  || typeof talk.summary != "string") {
						respond(response, 400, "Bad talk data");
					}
					else {
						talks[title] = {title: title,
										presenter: talk.presenter,
										summary: talk.summary,
										comments: [] };
						registerChange(title);
						respond(response, 204, null);
					}

				});
			});

router.add("POST", /^\/talks\/([^\/]+)\/comments$/,
			function(request, response, title) {
				readStreamAsJSON(request, function(error, comment) {
					if(error) {
						respond(response, 404, error.toString());
					}
					else if(!comment ||
							typeof comment.author != "string" ||
							typeof comment.message != "string") {
						respond(response, 400, "Bad comment data");

					}
					else if(title in talks) {
						talks[title].comments.push(comment);
						registerChange(title);
						respond(response, 204, null);
					}
					else {
						respond(response, 404, `No talk ${title} found`);
					}
				});
			});


function sendTalks(talks, response) {
	respondJSON(response, 200, {serverTime: Date.now(),
								talks: talks}
								);
}