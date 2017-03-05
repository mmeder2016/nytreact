// Include React
var React = require("react");

var SavedArticle = React.createClass({
    render: function() {
        console.log('SavedArticle render: function () {');
        return (
            <div className="well">
                <a href={this.props.url}><h4>{this.props.title}</h4></a>
                <button data-id={this.props.id} className="delete-article" type="submit">Delete Article</button>
            </div>
        );
    }
});

module.exports = SavedArticle;