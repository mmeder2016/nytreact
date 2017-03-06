// Include React
var React = require("react");
var SavedArticle = require ("./SavedArticle");
var helper = require("./utils/helpers");

var Saved = React.createClass({
    getInitialState: function () {
        console.log('Saved getInitialState: function () {');
        return {
            savedArticles: []
        };
    },
    componentDidMount: function () {
        console.log('Saved componentDidMount: function () {');
        this.updateState();
        // helper.getSavedArticles().then(function (response) {
        //     this.setState({
        //         savedArticles: response.data
        //     });
        // }.bind(this));
    },
    updateState: function () {
        console.log('Saved updateState: function () {');
        helper.getSavedArticles().then(function (response) {
            this.setState({
                savedArticles: response.data
            });
        }.bind(this));
    },

    render: function() {
        console.log('Saved render: function () {');
        // Need a reference to the Saved object to pass to each SavedArticle object
        var parent = this;
        var savedMap = this.state.savedArticles.map(function (savedArticle) {
            // Note we are passing a reference to the updateState function to 
            // the child objects so after the child (SavedArticle) successfully
            // delete its Article from the database, it can notify its parent
            // the Saved object to go back to the database to update the 
            // SavedArticles list with the current list
            return (<SavedArticle title={savedArticle.title} key={savedArticle._id} id={savedArticle._id} url={savedArticle.url} updateStateProp={parent.updateState}/>)
        });

        return ( 
          <div className="row">
              <div className="col-sm-12">
                  <div className="panel panel-primary">
                      <div className="panel-heading">
                          <h3 className="panel-title"><strong>Saved</strong></h3>
                      </div>
                        <div className="panel-body" id="savedSection">
                            {savedMap}
                        </div>
                  </div>
              </div>
          </div>
        );
    }
});

module.exports = Saved;