// Include React
var React = require("react");
var SearchResult = require ("./SearchResult");
var helper = require("./utils/helpers");

var SearchPanel = React.createClass({

    // getInitialState: function () {
    //     console.log('SearchPanel getInitialState: function () {');
    // },
    // updateState: function (data) {
    //     console.log('SearchPanel updateState: function () {');
    // },
    handleClick: function (event) {
        console.log('SearchPanel handleClick: function (event) {');
        var AUTHKEY = "ddf9d1e644824210a2d58a6dc64442cc";
        var NUMRESULTS = 5;
        var QUERYURLBASE = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + AUTHKEY + "&q=";
        var searchTerm = document.getElementById('searchTerm').value.trim();
        var startYear = document.getElementById('startYear').value.trim();
        var endYear = document.getElementById('endYear').value.trim();

        var queryURL = "";
        var results = [];
        if(searchTerm && parseInt(startYear) && parseInt(endYear)) {
            queryURL = QUERYURLBASE + searchTerm;
            queryURL += "&begin_date=" + startYear + "0101";
            queryURL += "&end_date=" + endYear + "0101";

            helper.runQuery(queryURL).then(function (nyt) {
                console.log(nyt);
                // Parse the NY Times data
                for (var i = 0; i < NUMRESULTS && i < nyt.data.response.docs.length; i++) {
                    var obj = {
                        title: nyt.data.response.docs[i].headline.main,
                        date: nyt.data.response.docs[i].pub_date,
                        url: nyt.data.response.docs[i].web_url,
                        id: nyt.data.response.docs[i]._id
                    };
                    results.push(obj);
                }
                this.props.updateSearchResults(results);
            }
            .bind(this))
            .catch(function(error) {
                console.log(error.message);
            });


        } else {
            if(queryURL === '')
                console.log('queryURL failure');
        }
    },

    render: function() {
        console.log('SearchPanel render: function () {');
        return ( 
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
                                <button onClick={this.handleClick} className="btn btn-default" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SearchPanel;