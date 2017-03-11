// will be used by REACT on the FRONT END
var axios = require("axios");
var helper = {
    saveArticle: function(db_title, db_date, db_url) {
        console.log('helper saveArticle: function () {');
        console.log('axios.post("/saved");');
        return axios({
            method: "POST",
            url: "/saved",
            data: {
                title: db_title,
                date: db_date,
                url: db_url
            }
        });
    },

    getSavedArticles: function() {
        console.log('helper getSavedArticles: function () {');
        console.log('axios.get("/saved");');

        return axios.get("/saved");
    },

    deleteArticle: function(db_id) {
        console.log('helper deleteArticle: function (id) {');
        console.log('axios.delete("/saved", params);');

        return axios({
            method: "DELETE",
            url: "/saved",
            data: {
                id: db_id
            }
        });
    },

    runQuery: function(queryURL) {
        console.log('helper runQuery: function(queryURL) {');
        console.log('axios.get("/queryURL");');
        console.log(queryURL);

        return axios.get(queryURL);

        // return axios({
        //     method: "GET",
        //     url: queryURL
        // });
    },

    updateSaved: function() {}
}

module.exports = helper;