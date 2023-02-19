window.onload = initialize;

function initialize() {
    console.log("hello there");

    // Encrypted Packets
    var enpktButton = document.getElementById('enpkt');
    enpktButton.onclick = onClickEnpkt;

    // Decrypted Packets
    var depktButton = document.getElementById('depkt');
    depktButton.onclick = onClickDepkt;

    // TCP


    // TLS

    // IP

}

function getAPIBaseURL() {
    let baseURL = window.location.protocol
                    + '//' + window.location.hostname
                    + ':' + window.location.port
                    + '/api';
    return baseURL;
}

function onClickEnpkt() {
    getEnpkt();
}

function getEnpkt() {

    var url = getAPIBaseURL() + '/encrypted/';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(enpktOutput) {

        // Build the table body.
        var tableBody = '';
        console.log(enpktOutput);

        // NOTE: output JSON/dict starts at 1
        // Gets packet from 1-3
        tableBody += '<tr><td>' + enpktOutput[1] + '</td></tr>';
        tableBody += '<tr><td>' + enpktOutput[2] + '</td></tr>';
        tableBody += '<tr><td>' + enpktOutput[3] + '</td></tr>';

        var resultsTableElement = document.getElementById('results_table');
        resultsTableElement.innerHTML = tableBody;

        var infoBoxElement = document.getElementById('infobox');
        infoBoxElement.innerHTML = "I love encrypted packets.";
    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });

}

function getAPIBaseURL() {
    let baseURL = window.location.protocol
                    + '//' + window.location.hostname
                    + ':' + window.location.port
                    + '/api';
    return baseURL;
}

function onClickDepkt() {
    getDepkt();
}

function getDepkt() {

    var url = getAPIBaseURL() + '/decrypted/';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(depktOutput) {

        // Build the table body.
        var tableBody = '';
        console.log(depktOutput);

        // NOTE: output JSON/dict starts at 1
        // Gets packet from 1-3
        tableBody += '<tr><td>' + depktOutput[1] + '</td></tr>';
        tableBody += '<tr><td>' + depktOutput[2] + '</td></tr>';
        tableBody += '<tr><td>' + depktOutput[3] + '</td></tr>';

        var resultsTableElement = document.getElementById('results_table');
        resultsTableElement.innerHTML = tableBody;

        var infoBoxElement = document.getElementById('infobox');
        infoBoxElement.innerHTML = "I love decrypted packets.";

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
