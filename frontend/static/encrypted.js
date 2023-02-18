window.onload = initialize;

function initialize() {
    console.log("hello there");
    var tcpButton = document.getElementById('tcp');
    tcpButton.onclick = onTCPClick;
}

function getAPIBaseURL() {
    let baseURL = window.location.protocol
                    + '//' + window.location.hostname
                    + ':' + window.location.port
                    + '/api';
    return baseURL;
}

function onTCPClick() {
    console.log("TCP is clicked");
    getTCP();
}

function getTCP() {

    var url = getAPIBaseURL() + '/encrypted/';

    // Send the request to the Crosswords API /authors/ endpoint
    fetch(url, {method: 'get'})

    // When the results come back, transform them from a JSON string into
    // a Javascript object (in this case, a list of author dictionaries).
    .then((response) => response.json())

    // Once you have your list of author dictionaries, use it to build
    // an HTML table displaying the author names and lifespan.
    .then(function(tcpOutput) {
        // Build the table body.
        var tableBody = '';

        console.log(tcpOutput);

        // NOTE: output JSON/dict starts at 1
        // Gets packet from 1-3
        tableBody += '<tr><td>' + tcpOutput[1] + '</td></tr>';
        tableBody += '<tr><td>' + tcpOutput[2] + '</td></tr>';
        tableBody += '<tr><td>' + tcpOutput[3] + '</td></tr>';

        var resultsTableElement = document.getElementById('results_table');
        resultsTableElement.innerHTML = tableBody;


        /*
        var searchResult = document.getElementById('search-result');
        if(clueList == 0) {
            searchResult.innerHTML = "No results found for:" + '"' + searchText + '"' + ' Try a different search!';
        }
        else {
            searchResult.innerHTML = "Showing results for: " + '"' + searchText + '"';

            for (var k = 0; k < clueList.length; k++) {
                tableBody += '<tr><td><a onclick="getPuzzleFromClue(' + clueList[k]['clue_id']+ ",'"
                    + clueList[k]['clue']  + "','"
                    + clueList[k]['answer'] 
                    + "')\">"
                    + clueList[k]['clue']
                    + '</a></td></tr>';

            }
        }
        // Put the table body we just built inside the table that's already on the page.
        var resultsTableElement = document.getElementById('results_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
        console.log(tableBody);
        */
    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });

}

/*
function onCluesSearch(searchText) {

    var url = getAPIBaseURL() + '/clues/' + searchText;

    // Send the request to the Crosswords API /authors/ endpoint
    fetch(url, {method: 'get'})

    // When the results come back, transform them from a JSON string into
    // a Javascript object (in this case, a list of author dictionaries).
    .then((response) => response.json())

    // Once you have your list of author dictionaries, use it to build
    // an HTML table displaying the author names and lifespan.
    .then(function(clueList) {
        // Build the table body.
        var tableBody = '';

        var searchResult = document.getElementById('search-result');
        if(clueList == 0) {
            searchResult.innerHTML = "No results found for:" + '"' + searchText + '"' + ' Try a different search!';
        }
        else {
            searchResult.innerHTML = "Showing results for: " + '"' + searchText + '"';

            for (var k = 0; k < clueList.length; k++) {
                tableBody += '<tr><td><a onclick="getPuzzleFromClue(' + clueList[k]['clue_id']+ ",'"
                    + clueList[k]['clue']  + "','"
                    + clueList[k]['answer'] 
                    + "')\">"
                    + clueList[k]['clue']
                    + '</a></td></tr>';

            }
        }
        // Put the table body we just built inside the table that's already on the page.
        var resultsTableElement = document.getElementById('results_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
        console.log(tableBody);
    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });

}
*/
