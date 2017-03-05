// This file contains 3 event handlers and 1 functions
//
// Event Handler 1.) The "Submit Search Button" for the NY Times search. This 
//   function gathers the user data for the search from the Search Panel and
//   creates the URL to submit to the NY Times. It then calls the function 
//   runQuery.
// Function 1.) "runQuery"" Submits the query to the NY Times and then populates
//   the Search Panel with the data. The search and the populating of data
//   all takes place on the front end.
// Event Handler 2.) The "Save Article Button" Sends message to server to save
//   the article in the database.
// Event Handler 3.) The "Delete Saved Article Button" Sends message to server
//   to delete the article in the database.

$(document).ready(function() {
    // MMeder NY Times Search - new auth key 02/03/2017
    var AUTHKEY = "ddf9d1e644824210a2d58a6dc64442cc";
    var NUMRESULTS = 5;
    var QUERYURLBASE = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + AUTHKEY + "&q=";

    // Button handler for initiating a search with user inputs
    $('#runSearch').on('click', function() {
        var searchTerm = $('#searchTerm').val().trim();
        var startYear = $('#startYear').val().trim();
        var endYear = $('#endYear').val().trim();

        if(searchTerm && parseInt(startYear) && parseInt(endYear)) {
            queryURL = QUERYURLBASE + searchTerm;
            queryURL += "&begin_date=" + startYear + "0101";
            queryURL += "&end_date=" + endYear + "0101";
        }
        runQuery(queryURL);
        // This line allows us to take advantage of the HTML "submit" property. 
        // This way we can hit enter on the keyboard and it registers the search 
        // (in addition to clicks).
        return false;
    });

    function runQuery(queryURL) {
        // Initially sets the articleCounter to 0
        var articleCounter = 0;

        // Empties the region associated with the articles
        $("#resultsSection").empty();

        // The AJAX function uses the URL and Gets the JSON data associated 
        // with it. The data then gets stored in the variable called: "NYTData"
        //  Then creates a button with the data- attribute containing the 
        // title, date, and url.
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(NYTData) {
                // Loop through and provide the correct number of articles
                for (var i = 0; i < NUMRESULTS && i < NYTData.response.docs.length; i++) {

                    articleCounter++;
                    // Create the HTML well (Section) and Add the Article content for each
                    var result = $("<div>");
                    result.addClass('well');
                    result.attr('id', 'article-' + articleCounter)
                    $('#resultsSection').append(result);

                    // Write the article title
                    if (NYTData.response.docs[i].headline != "null") {
                        $("#article-" + articleCounter).append('<h4><strong>   ' + NYTData.response.docs[i].headline.main + "</strong></h4>");
                    }
                    // Write the date
                    $("#article-" + articleCounter).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
                    // Write the url
                    $("#article-" + articleCounter).append('<a href="' + NYTData.response.docs[i].web_url + '">' + NYTData.response.docs[i].web_url + '</a><br/>');

                    var button = $('<button id="save-button" type="submit">Save Article</button>');
                    button.attr('data-title', NYTData.response.docs[i].headline.main );
                    button.attr('data-date', NYTData.response.docs[i].pub_date );
                    button.attr('data-url', NYTData.response.docs[i].web_url );
                    $("#article-" + articleCounter).append(button);
                }
            });
    }

    // Button handler for saving an article in the Search Results Panel
    $(document).on('click', '#save-button', function() {
        var newArticle = {
            title: $(this).attr('data-title'),
            date: $(this).attr('data-date'),
            url: $(this).attr('data-url')
        };
        console.log(newArticle);
        $.post("/saved", newArticle)
            .done(function(data) {
                console.log(data);
            });
    });

    // Button handler for deleting an article in the Saved Articles Panel
    $(document).on('click', '.delete-article', function() {
        $.ajax({
                method: "DELETE",
                url: "/saved",
                data: {
                    id: $(this).attr('data-id')
                }
            })
            .done(function(data) {
                console.log(data);
            });
    });
});
