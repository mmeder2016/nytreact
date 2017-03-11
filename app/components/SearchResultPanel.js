// Include React
var React = require("react");
var SearchResult = require ("./SearchResult");
var helper = require("./utils/helpers");

var SearchResultPanel = React.createClass({

    // getInitialState: function () {
    //     console.log('SearchResultPanel getInitialState: function () {');
    //     return {
    //         this.props.searchResults: []
    //     };
    // },
    // updateState: function (data) {
    //     console.log('SearchResultPanel updateState: function () {');
    //     this.setState({
    //         searchResults: data
    //     });
    // },
    saveArticleCallback: function(){
        console.log('saveArticleCallback: function(){');
        // Inform Main a new Article was successfully saved
        this.props.updateSavedArticles();
    },

    render: function() {
        console.log('SearchResultPanel render: function () {');
        var parent = this;
        var searchResultsMap = this.props.searchResults.map(function (searchResult) {
            return (<SearchResult cb={parent.saveArticleCallback} title={searchResult.title} date={searchResult.date} url={searchResult.url} key={searchResult.id}/>)
        });
        return ( 
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title"><strong>Search Results</strong></h3>
                        </div>
                        <div className="panel-body" id="resultsSection">
                            {searchResultsMap}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SearchResultPanel;