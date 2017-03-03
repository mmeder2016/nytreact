// Include React
var React = require("react");

var Search = React.createClass({
    render: function() {
        return ( 
            <div>
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
                                        <input type="text" className="form-control" id="searchTerm" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="startYear">Start Year</label>
                                        <input type="text" className="form-control" id="startYear" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endYear">End Year</label>
                                        <input type="text" className="form-control" id="endYear" />
                                    </div>
                                    <button type="submit" className="btn btn-default" id="runSearch">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong>Results</strong></h3>
                            </div>
                            <div className="panel-body" id="resultsSection">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Search;