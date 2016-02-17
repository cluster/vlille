var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

//
//conf
//
app.use(express.static(__dirname + '/public'));
//probably not a good idea to show my dependencies to the world...
app.use('/libs', express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
require('./app/routes.js')(app);


//
//the app!
//
app.listen(8080);
console.log("App started on port 8080");
