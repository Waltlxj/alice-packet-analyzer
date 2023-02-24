window.onload = initialize;

function initialize() {

    // Decrypted Packets
    var depktButton = document.getElementById('depkt');
    depktButton.onclick = onClickDepkt;

    // TCP
    var tcpButton = document.getElementById('tcp');
    tcpButton.onclick = onClickTcp;

    /*
    // Encrypted Packets
    var enpktButton = document.getElementById('enpkt');
    enpktButton.onclick = onClickEnpkt;

    // TLS
    var tlsButton = document.getElementById('tls');
    tlsButton.onclick = onClickTls;
    */

    // IP
    var ipButton = document.getElementById('ip');
    ipButton.onclick = onClickIp;

    // HTTP
    var httpButton = document.getElementById('http');
    http.onclick = onClickHttp;


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
        console.log(Object.keys(enpktOutput).length);

        // NOTE: output JSON/dict starts at 1
        // Gets packet from 1-3
        for(var i = 1; i <= Object.keys(enpktOutput).length; i++) {
            tableBody +='<tr><td> Packet: ' + i + '     </td>';
            tableBody += '<td>' + enpktOutput[i] + '</td></tr>';
        }

        //console.log(tableBody);
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

        // NOTE: output JSON/dict starts at 1
        for(var i = 1; i <= Object.keys(depktOutput).length; i++) {
            tableBody +='<tr><td> Packet: ' + i + '     </td>';
            tableBody += '<td>' + depktOutput[i] + '</td></tr>';
        }

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

function onClickTcp() {
    getTcp();
}

function getTcp() {

    var url = getAPIBaseURL() + '/tcp/';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(tcpOutput) {

        // Build the table body.
        var tableBody = '';

        // NOTE: output JSON/dict starts at 1

        var tcpKeys = Object.keys(tcpOutput);
        console.log(tcpKeys);

        for(var i = 0; i < tcpKeys.length; i++ ) {
            tableBody += '<tr><td>' + tcpKeys[i] + '</td>';
            tableBody += '<td>' + tcpOutput[tcpKeys[i]] + '</td></tr>';

        }

        var resultsTableElement = document.getElementById('results_table');
        resultsTableElement.innerHTML = tableBody;

        var infoBoxElement = document.getElementById('infobox');
        infoBoxElement.innerHTML = "I love tcp.";

    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });

}

function onClickTls() {
    getTls();
}

function getTls() {

    var url = getAPIBaseURL() + '/tls/';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(tlsOutput) {

        // Build the table body.
        var tableBody = '';

        // NOTE: output JSON/dict starts at 1
        var tlsKeys = Object.keys(tlsOutput);
        console.log(tlsKeys);

        for(var i = 0; i < tlsKeys.length; i++ ) {
            tableBody += '<tr><td>' + tlsKeys[i] + '</td>';
            var currentTlsVal = tlsOutput[tlsKeys[i]];

            if(Array.isArray(tlsOutput[tlsKeys[i]])) {
                console.log("FOUND ARRAY!!");
                //console.log(tlsOutput[tlsKeys[i]]);
                currentTlsVal = '';
                for(var j = 0; j < tlsOutput[tlsKeys[i]].length; j++) {
                    currentTlsVal += tlsOutput[tlsKeys[i]][j] + '\n';
                    //console.log(tlsOutput[tlsKeys[i]][j]);

                }
            }
            tableBody += '<td>' + currentTlsVal + '</td></tr>';

        }

        var resultsTableElement = document.getElementById('results_table');
        resultsTableElement.innerHTML = tableBody;

        var infoBoxElement = document.getElementById('infobox');
        infoBoxElement.innerHTML = "I love tls.";

    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });
}


function onClickIp() {
    getIp();
}

function getIp() {
    var url = getAPIBaseURL() + '/ip/';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(ipOutput) {

        // Build the table body.
        var tableBody = '';

        // NOTE: output JSON/dict starts at 1
        var ipKeys = Object.keys(ipOutput);
        console.log(ipKeys);

        for(var i = 0; i < ipKeys.length; i++ ) {
            tableBody += '<tr><td>' + ipKeys[i] + '</td>';
            tableBody += '<td>' + ipOutput[ipKeys[i]] + '</td></tr>';

        }

        var resultsTableElement = document.getElementById('results_table');
        resultsTableElement.innerHTML = tableBody;

        var infoBoxElement = document.getElementById('infobox');
        infoBoxElement.innerHTML = "I love ips.";

    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });
}

function onClickHttp() {
    getHttp();
}

function getHttp() {
    var url = getAPIBaseURL() + '/http/';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(httpOutput) {

        // Build the table body.
        var tableBody = '';

        // NOTE: output JSON/dict starts at 1
        var httpKeys = Object.keys(httpOutput);
        console.log(httpKeys);

        for(var i = 0; i < httpKeys.length; i++ ) {
            tableBody += '<tr><td>' + httpKeys[i] + '</td>';
            tableBody += '<td>' + httpOutput[httpKeys[i]] + '</td></tr>';

        }

        var resultsTableElement = document.getElementById('results_table');
        resultsTableElement.innerHTML = tableBody;

        var infoBoxElement = document.getElementById('infobox');
        infoBoxElement.innerHTML = "I love ips.";

    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });
}