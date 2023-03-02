window.onload = initialize;

function initialize() {

    // Encrypted Packets
    var enpktButton = document.getElementById('enpkt');
    enpktButton.onclick = onClickEnpkt;

    /*
    // Decrypted Packets
    var depktButton = document.getElementById('depkt');
    depktButton.onclick = onClickDepkt;

    // HTTP
    var httpButton = document.getElementById('http');
    http.onclick = onClickHttp;
    */
   
    // TLS
    var tlsButton = document.getElementById('tls');
    tlsButton.onclick = onClickTls;

    // TCP
    var tcpButton = document.getElementById('tcp');
    tcpButton.onclick = onClickTcp;

    

    // IP
    var ipButton = document.getElementById('ip');
    ipButton.onclick = onClickIp;

    


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
        infoBoxElement.innerHTML = '<b class="enpkt"> Encrypted Packets </b> These packets are encrypted (what you would see without the encryption key).';
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
        infoBoxElement.innerHTML = '<b class="dpkt"> Decrypted Packets: </b>  These packets have been decrypted with TLS session keys output by the browser SSLKEYLOGFILE.';

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
        infoBoxElement.innerHTML = '<b class="tcp"> TCP: </b>  The Transmission Control Protocol (TCP) facilitates the connection of hosts for the exchange of data. TCP works to keep packet delivery error free, ensuring all packets are received and in the correct order. To witness the start of a TCP session, try and find the TCP handshake, “SYN, SYN-ACK, and ACK.”';

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
        infoBoxElement.innerHTML = '<b class="tls"> TLS: </b>  Transport Layer Security (TLS) is a protocol which exists to ensure communication privacy by preventing eavesdropping and the malicious tampering of data. The TLS handshake authenticates the server\'s X509 certificate before initiating the Die-Hellman key exchange for secure symmetric encryption. Details on the server\'s certificate are available below.';

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
        infoBoxElement.innerHTML = '<b class="ip"> IP: </b>  The IP or “Internet Protocol” address is an identifier which serves an addressing function for computers within a network. Like a real address, an IP address designates a location. Packets sent over a network are marked by a header disclosing their sender and intended receiver. Because of IP, packets sent over a network will reliably arrive at their intended place.';

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
        infoBoxElement.innerHTML = '<b class="http"> HTTP: </b>  THTTP, or the “Hypertext Transfer Protocol” oversees the transfer of hypermedia, such as HTML, between web browsers and servers.';
    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });
}