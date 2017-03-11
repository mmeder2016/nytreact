// Include React
var React = require("react");
var helper = require("./utils/helpers");

var SearchResult = React.createClass({
    handleClick: function (event) {
        console.log('SearchResult handleClick: function (event) {');
        helper.saveArticle(this.props.title, this.props.date, this.props.url).then(function (response) {
            // Inform SeachResultPanel an Article was successfully saved
            this.props.cb();
        }.bind(this));
    },
    render: function() {
        console.log('SearchResult render: function () {');
        return (
            <div className="well">
                <h4><strong>{this.props.title}</strong></h4>
                <h5>{this.props.date}</h5><a href={this.props.url}>{this.props.url}</a><br />
                <button id="save-button" onClick={this.handleClick} type="submit" data-title={this.props.title} data-date={this.props.date} data-url={this.props.url}>Save Article</button>
            </div>
        );
    }
});

module.exports = SearchResult;