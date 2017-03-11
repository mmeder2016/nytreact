// Include React
var React = require("react");
var SavedArticle = require ("./SavedArticle");
var helper = require("./utils/helpers");

var SavedArticlePanel = React.createClass({
    getInitialState: function () {
        console.log('SavedArticlePanel getInitialState: function () {');
        return {
            savedArticles: []
        };
    },
    componentDidMount: function () {
        console.log('SavedArticlePanel componentDidMount: function () {');
        this.updateState();
    },
    updateState: function () {
        console.log('SavedArticlePanel updateState: function () {');
        helper.getSavedArticles().then(function (response) {
            this.setState({
                savedArticles: response.data
            });
        }.bind(this));
    },

    render: function() {
        console.log('SavedArticlePanel render: function () {');
        // Need a reference to the SavedArticlePanel object to pass to each SavedArticle object
        var parent = this;
        var savedArticleMap = this.state.savedArticles.map(function (savedArticle) {
            // Note we are passing a reference to the updateState function to 
            // the child objects so after the child (SavedArticle) successfully
            // delete its Article from the database, it can notify its parent
            // the SavedArticlePanel object to go back to the database to update the 
            // SavedArticlePanelArticles list with the current list
            return (<SavedArticle title={savedArticle.title} key={savedArticle._id} id={savedArticle._id} url={savedArticle.url} updateStateProp={parent.updateState}/>)
        });

        return ( 
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title"><strong>Saved Articles</strong></h3>
                        </div>
                        <div className="panel-body" id="savedSection">
                            {savedArticleMap}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SavedArticlePanel;