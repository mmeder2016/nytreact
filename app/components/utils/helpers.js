// will be used by REACT on the FRONT END
var axios = require("axios");
var helper = {
    getSavedArticles: function () {
        console.log('helper getSaved: function () {');
        console.log('axios.get("/saved");');
        // ajax request (promised based!!!)
        return axios.get("/saved");
    },
    updateSaved: function () {}
}

module.exports = helper;