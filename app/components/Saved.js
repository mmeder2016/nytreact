// Include React
var React = require("react");

var Saved = React.createClass({
    render: function() {
        return ( 
          <div className="row">
              <div className="col-sm-12">
                  <div className="panel panel-primary">
                      <div className="panel-heading">
                          <h3 className="panel-title"><strong>Saved</strong></h3>
                      </div>
                        <div className="panel-body" id="savedSection">
                        </div>
                  </div>
              </div>
          </div>
        );
    }
});

module.exports = Saved;