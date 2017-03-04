$(window).load(function() {
    getSaved();
});

function getSaved() {
    $("#savedSection").empty();

    // The AJAX function uses the URL and Gets the JSON data associated with it. 
    // The data then gets stored in the variable called: "NYTData"
    $.get("/saved")
        .done(function(data) {
            console.log('$.get("/saved")');
            console.log(data);

            for (var i = 0; i < data.length; i++) {

                var saved = $("<div>");
                saved.addClass('well');
                saved.attr('id', 'article-' + data[i]._id);
                $('#savedSection').append(saved);

                // Write the url
                var link = '<a href="' + data[i].url + '"><h4>' + data[i].title + '</h4></a>';
                console.log('link:' + link);
                $('#article-' + data[i]._id).append(link);

                var button = $("<button>");
                button.attr('id', data[i]._id);
                button.addClass('delete-article');
                button.attr('type', 'submit');
                button.text('Delete Article');
                $('#article-' + data[i]._id).append(button);
            }

        });
}

$(document).ready(function() {
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

    $(document).on('click', '#button-1', function() {
        var newArticle = {
            title: document.getElementById("title-1").innerText,
            date: document.getElementById("date-1").innerText,
            url: document.getElementById("url-1").innerText
        };
        $.post("/saved", newArticle)
            .done(function(data) {
                console.log(data);
            });
    });
    $(document).on('click', '#button-2', function() {
        var newArticle = {
            title: document.getElementById("title-2").innerText,
            date: document.getElementById("date-2").innerText,
            url: document.getElementById("url-2").innerText
        };
        $.post("/saved", newArticle)
            .done(function(data) {
                console.log(data);
            });
    });
    $(document).on('click', '#button-3', function() {
        var newArticle = {
            title: document.getElementById("title-3").innerText,
            date: document.getElementById("date-3").innerText,
            url: document.getElementById("url-3").innerText
        };
        $.post("/saved", newArticle)
            .done(function(data) {
                console.log(data);
            });
    });
    $(document).on('click', '#button-4', function() {
        var newArticle = {
            title: document.getElementById("title-4").innerText,
            date: document.getElementById("date-4").innerText,
            url: document.getElementById("url-4").innerText
        };
        $.post("/saved", newArticle)
            .done(function(data) {
                console.log(data);
            });
    });
    $(document).on('click', '#button-5', function() {
        var newArticle = {
            title: document.getElementById("title-5").innerText,
            date: document.getElementById("date-5").innerText,
            url: document.getElementById("url-5").innerText
        };
        $.post("/saved", newArticle)
            .done(function(data) {
                console.log(data);
            });
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


    $(document).on('click', '.delete-article', function() {
        $.ajax({
                method: "DELETE",
                url: "/saved",
                data: {
                    id: this.id
                }
            })
            .done(function(data) {
                console.log(data);
                getSaved();
            });
    });
});