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
        helper.getSavedArticles().then(function (response) {
            // do something
            this.setState({
                savedArticles: response.data
            });
        }.bind(this));
    },

    render: function() {
        console.log('Saved render: function () {');

        var savedMap = this.state.savedArticles.map(function (savedArticle) {
            return (<SavedArticle title={savedArticle.title} key={savedArticle._id} id={savedArticle._id} url={savedArticle.url} />)
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