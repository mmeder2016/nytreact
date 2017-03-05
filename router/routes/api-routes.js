// SERVER API ROUTING
module.exports = function(app, db, approot) {
    var path = require('path');
    var Article = require(path.join(approot, '/models/Article.js'));

    app.get("/", function(req, res) {
        console.log('app.get("/", function(req, res) {');
        res.sendFile(path.join(approot, '/public/index.html'));
    });

    app.delete("/saved", function(req, res) {
        console.log('app.delete("/saved", function(req, res) {');

        Article.findByIdAndRemove(req.body.id, function(error, article) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log("Deleted Article:id:" + req.body.id);
                res.json(article);
            }
        });
    });

    app.get("/saved", function(req, res) {
        console.log('app.get("/saved", function(req, res) {');
        Article.find({})
            .exec(function(error, doc) {
                if (error) {
                    console.log(error);
                    res.send(error);
                } else {
                    console.log("Successfully acquired Articles from db.");
                    res.json(doc);
                }
            });
    });

    app.post("/saved", function(req, res) {
        console.log('app.post("/saved", function(req, res) {');
        var article = new Article({ title: req.body.title, date: req.body.date, url: req.body.url });
        article.save(function(error, doc) {
            if (error) {
                console.log(error);
                console.log("Failed to save Article.");
                res.send(error);
            } else {
                console.log("Successfully saved Article.");
                res.json(doc);
            }
        });
    });
};