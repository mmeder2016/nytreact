// Include React
var React = require("react");

var Saved = require("./saved");
var Search = require("./search");

var Main = React.createClass({
    render: function() {
        return ( 
        <div className="container-fluid">
            <div className="row">
                <div>
                    <h1 className="text-center">Article</h1>
                    <br/>
                    <div className="text-center">
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-12">
                    <br/>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title"><strong>Search</strong></h3>
                        </div>
                        <div className="panel-body">
                            <form role="form">
                                <div className="form-group">
                                    <label htmlFor="search">Topic:</label>
                                    <input type="text" className="form-control" id="searchTerm"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startYear">Start Year</label>
                                    <input type="text" className="form-control" id="startYear"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endYear">End Year</label>
                                    <input type="text" className="form-control" id="endYear"/>
                                </div>
                                <button type="submit" className="btn btn-default" id="runSearch">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Search/>
            <Saved/>
          </div>
        );
    }
});

module.exports = Main;