# Alice Packet Analyzer

A pedagogical tool to demonstrate the details of HTTPS/TLS protocol in action.

Given a URL to browse, the tool can capture the transmitted encrypted packets while browsing the website, use the session key to decrypt the packets, and display all the information along with the protocol details (e.g., TLS handshake, SSL certification verification) on a user interface.

## How to decrypt SSL/TLS packets manually

Using SSLKEYLOGFILE and Wireshark to decrypt TLS/SSL traffic on kali linux [(reference)](https://support.f5.com/csp/article/K50557518#OnLinux):

- Set the SSLKEYLOGFILE environment variable by using the following command syntax: `export SSLKEYLOGFILE="/home/kali/<whatever path you want/key.txt>"`
- Let Wireshark know the path: Edit > Preferences > Protocols > TLS > (Pre)-Master-Secret log filename enter `"/home/kali/<whatever path you want/key.txt>"` so it will get the keys and automatically decrypt TLS/SSL traffic.
- Run a browser in the same terminal process (use curl or chromium, Kali’s firefox version does not work). When the browser accesses a HTTPS website, it will log the keys to the file path you specified as SSLKEYLOGFILE . Wireshark will use the keys in that file to decrypt traffic and on Wireshark interface you will be able to see packets translated into HTTP request and response data.

[Here is a bash script file](./backend/alice.sh) to automate the process.
