// will be used by REACT on the FRONT END
var axios = require("axios");
var helper = {
    getSaved: function () {
        // ajax request (promised based!!!)
        return axios.get("/saved");
    },
    updateSaved: function () {}
}

module.exports = helper;