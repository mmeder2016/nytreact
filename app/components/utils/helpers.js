// will be used by REACT on the FRONT END
var axios = require("axios");
var helper = {
    getSavedArticles: function() {
        console.log('helper getSaved: function () {');
        console.log('axios.get("/saved");');
        // ajax request (promised based!!!)
        return axios.get("/saved");
    },

    deleteArticle: function(db_id) {
        console.log('deleteArticle: function (id) {');
        console.log('axios.delete("/saved", params);');

        return axios({
            method: "DELETE",
            url: "/saved",
            data: {
                id: db_id
            }
        });
    },

    updateSaved: function() {}
}

module.exports = helper;