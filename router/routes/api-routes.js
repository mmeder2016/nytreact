// SERVER API ROUTING
module.exports = function(app, db, approot) {
    var path = require('path');
    var Article = require(path.join(approot, '/models/Article.js'));

    app.get("/", function(req, res) {
        console.log('app.get("/", function(req, res) {');

        res.sendFile(path.join(approot, '/public/index.html'));
        // Story.find({})
        //     .populate("comments")
        //     // Now, execute the query
        //     .exec(function(error, doc) {
        //         // Send any errors to the browser
        //         if (error) {
        //             res.send(error);
        //         } else {
        //             res.render('index', { stories: doc });
        //         }
        //     });
    });

    app.delete("/saved", function(req, res) {
        console.log('app.delete("/saved", function(req, res) {');
        console.log('req.params.id: ' + req.params.id);

        // Remove the comment from the Comments collection
        // Comment.findByIdAndRemove(req.params.id, function(error, comment) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Deleted Comment:id:" + comment._id);
        //         // DID NOT REMOVE ID FROM STORIES OBJECT
        //     }
        // });
        //res.redirect("/");
        res.send('app.delete("/saved", function(req, res) {');
    });

    app.post("/submit", function(req, res) {
        console.log('app.post("/submit", function(req, res) {');

        res.send('app.post("/submit", function(req, res) {');
    });
};