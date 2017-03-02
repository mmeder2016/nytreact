// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create a ArticleSchema with the Schema class
var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        required: true,
        trim: true,
    }
});

// Make a Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;