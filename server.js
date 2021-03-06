//////////////////// TEST SERVER ////////////////////

//////////////////// EXPRESS SETUP ////////////////////
var express = require("express");
var app = express();
app.use(express.static("./public"));

//////////////////// METHOD OVERRIDE SETUP ////////////////////
// var methodOverride = require('method-override');
// app.use(methodOverride('_method'));

//////////////////// BODY PARSER SETUP ////////////////////
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//////////////////// ALLOW CORS  ////////////////////
// http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//////////////////// DATABASE MODELS MONGOOSE ////////////////////
var mongoose = require('mongoose');
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;
var Article = require("./models/Article.js");
//mongoose.connect("mongodb://localhost/nytreact");
mongoose.connect("mongodb://heroku_g5286zlf:96qohdc0b9nurh2kktksepvh2@ds119210.mlab.com:19210/heroku_g5286zlf");
var db = mongoose.connection;
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//////////////////// SET PORT PLATFORM INDEPENDENT ////////////////////
app.set('port', (process.env.PORT || 3000));

//////////////////// SET EXPRESS ROUTES ////////////////////
var router = require('./router');
router(app, db, __dirname);

//////////////////// START THE SERVER ////////////////////
app.listen(app.get('port'), function() {
    console.log("App running on port 3000!");
});
