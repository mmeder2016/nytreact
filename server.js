//////////////////// ICE SCRAPER SERVER ////////////////////

//////////////////// EXPRESS SETUP ////////////////////
var express = require("express");
var app = express();

//////////////////// HANDLEBARS SETUP ////////////////////
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//////////////////// METHOD OVERRIDE SETUP ////////////////////
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

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

//////////////////// SET PORT PLATFORM INDEPENDENT ////////////////////
app.set('port', (process.env.PORT || 3000));

//////////////////// DATABASE MODELS ////////////////////
var mongoose = require('mongoose');
var Comment = require("./models/Comment.js");
var Story = require("./models/Story.js");
// Database configuration with mongoose
mongoose.connect("mongodb://localhost/test_db");
//mongoose.connect("mongodb://heroku_rxndvpvw:moi649i63lli21bkp1knuedun5@ds161059.mlab.com:61059/heroku_rxndvpvw");
var db = mongoose.connection;
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//////////////////// SET ROUTES ////////////////////
var router = require('./router');
router(app, db, __dirname);

//////////////////// USE CHERIO TO SCRAPE HTML FOR HEADLINES AND LINKS
var request = require('request'); // Acquires HTML from URLs
var cheerio = require('cheerio'); // Scrapes HTML
// An array to save the data that we'll scrape
var scrapeResults = [];
scrapeWashingtonPost();

//////////////////// START THE SERVER ////////////////////
app.listen(app.get('port'), function() {
    console.log("App running on port 3000!");
});

// HELPER FUNCTIONS
function scrapeWashingtonPost() {
    request("https://www.washingtonpost.com/", function(error, response, html) {
        var $ = cheerio.load(html); // Load the HTML into cheerio
        // With cheerio, find each div with the "headline" class
        $('div.headline').each(function(i, element) {
            var headline = $(element).children().text(); // child element text
            var link = $(element).children().attr("href"); // child element link
            // if the there is a headline and a link, 
            if (headline && link) {
                var story = new Story({ headline: headline, link: link });
                story.save(function(error, doc) {
                    if (error) {
                        console.log(error);
                        console.log("Failed to save Story.")
                    } else {
                        console.log("Successfully saved Story.")
                        console.log(doc);
                    }
                });
            }
        });
    });
}