// MMeder NY Times Search - new auth key 02/03/2017
var AUTHKEY = "ddf9d1e644824210a2d58a6dc64442cc";
var NUMRESULTS = 5;
// User Inputs
var queryTerm = "";

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + AUTHKEY + "&q=";


function runQuery(queryURL) {
    // Initially sets the articleCounter to 0
    var articleCounter = 0;

    // Empties the region associated with the articles
    $("#resultsSection").empty();

    // The AJAX function uses the URL and Gets the JSON data associated with it. 
    // The data then gets stored in the variable called: "NYTData"
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(NYTData) {
            console.log(NYTData);
            console.log("------------------------------------");
            // Loop through and provide the correct number of articles
            for (var i = 0; i < NUMRESULTS && i < NYTData.response.docs.length; i++) {

                // Add to the Article Counter (to make sure we show the right number)
                articleCounter++;
                // Create id's for gathering data
                var id_title = 'title-' + articleCounter;
                var id_date = 'date-' + articleCounter;
                var id_url = 'url-' + articleCounter;

                // Create the HTML well (Section) and Add the Article content for each
                var result = $("<div>");
                result.addClass('well');
                result.attr('id', 'article-' + articleCounter)
                $('#resultsSection').append(result);

                // Write the article title
                if (NYTData.response.docs[i].headline != "null") {
                    $("#article-" + articleCounter).append('<h4 id="' + id_title + '"><strong>   ' + NYTData.response.docs[i].headline.main + "</strong></h4>");
                }
                // Write the date
                $("#article-" + articleCounter).append('<h5 id= ' + id_date + '>' + NYTData.response.docs[i].pub_date + "</h5>");
                // Write the url
                $("#article-" + articleCounter).append('<a href="' + NYTData.response.docs[i].web_url + '" id=' + id_url + '>' + NYTData.response.docs[i].web_url + '</a><br/>');

                var button = $("<button>");
                button.attr('id', 'button-' + articleCounter);
                button.attr('type', 'submit');
                button.text('Save Article');
                $("#article-" + articleCounter).append(button);
            }
        });

}

$('#button-1').on('click', function() {
    var title = $('#id_title-1').val().trim(); 
    var date = $('#id_date-1').val().trim(); 
    var url = $('#id_url-1').val().trim(); 
    console.log('title:' + title);
    console.log('date:' + date);
    console.log('url:' + url);
});

$('#runSearch').on('click', function() {

    var searchTerm = $('#searchTerm').val().trim();
    var startYear = $('#startYear').val().trim();
    var endYear = $('#endYear').val().trim();

    queryURL = queryURLBase + searchTerm;

    if (parseInt(startYear)) {
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }

    if (parseInt(endYear)) {
        queryURL = queryURL + "&end_date=" + endYear + "0101";
    }

    // Then we will pass the final queryURL and the number of results to 
    // include to the runQuery function
    runQuery(queryURL);
    console.log('Built search url:' + queryURL);

    // This line allows us to take advantage of the HTML "submit" property. 
    // This way we can hit enter on the keyboard and it registers the search 
    // (in addition to clicks).
    return false;
});