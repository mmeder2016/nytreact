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
        type: Date
    },
    url: {
        type: String,
        required: true,
        trim: true,
    }
});

// Export the Article model
module.exports = mongoose.model("Article", ArticleSchema);