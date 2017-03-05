// Include React
var React = require("react");

var SavedArticle = React.createClass({
    render: function() {
            <div class="well">
                <a href="{this.props.url}"><h4>{this.props.title}</h4></a>
                <button data-id="{this.props.id}" class="delete-article" type="submit">Delete Article</button>
            </div>
        );
    }
});

module.exports = SavedArticle;