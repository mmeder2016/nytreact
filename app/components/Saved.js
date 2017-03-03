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
                      <div className="panel-body">
                          <div className="panel-body saved-panel">
                              <form action="/_method=PUT" method="POST">
                                  <div className="col-sm-10">
                                      <h6 id="saved01">SAVED 01</h6>
                                  </div>
                                  <div className="col-sm-2">
                                      <button type="submit">Remove</button>
                                  </div>
                              </form>
                          </div>
                          <div className="panel-body saved-panel">
                              <form action="/_method=PUT" method="POST">
                                  <div className="col-sm-10">
                                      <h6 id="saved02">SAVED 02</h6>
                                  </div>
                                  <div className="col-sm-2">
                                      <button type="submit">Remove</button>
                                  </div>
                              </form>
                          </div>
                          <div className="panel-body saved-panel">
                              <form action="/_method=PUT" method="POST">
                                  <div className="col-sm-10">
                                      <h6 id="saved03">SAVED 03</h6>
                                  </div>
                                  <div className="col-sm-2">
                                      <button type="submit">Remove</button>
                                  </div>
                              </form>
                          </div>
                          <div className="panel-body saved-panel">
                              <form action="/_method=PUT" method="POST">
                                  <div className="col-sm-10">
                                      <h6 id="saved04">SAVED 04</h6>
                                  </div>
                                  <div className="col-sm-2">
                                      <button type="submit">Remove</button>
                                  </div>
                              </form>
                          </div>
                          <div className="panel-body saved-panel">
                              <form action="/_method=PUT" method="POST">
                                  <div className="col-sm-10">
                                      <h6 id="saved05">SAVED 05</h6>
                                  </div>
                                  <div className="col-sm-2">
                                      <button type="submit">Remove</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
});

module.exports = Saved;