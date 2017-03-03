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
            <Search/>
            <Saved/>
          </div>
        );
    }
});

module.exports = Main;