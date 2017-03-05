// Include React
var React = require("react");

var Saved = React.createClass({
    getInitialState: function () {
        return {
            savedArticles: []
        };
    },
    componentDidMount: function () {
        helper.getArticles().then(function (response) {
            // do something
            this.setState({
                savedArticles: response.data
            });
        }.bind(this));
    },

    render: function() {
        var savedMap = this.state.saved.map(function (savedArticle) {
            return (<SavedArticle title={savedArticle.title} key={savedArticle._id} url={savedArticle.url} />)
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