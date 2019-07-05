const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//A catch all route for anything the webservice does not define

app.get("*", (request, response) => response.status(404).send({message: "Nothing to see here"}));

module.exports = app;