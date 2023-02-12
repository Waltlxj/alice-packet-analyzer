import os
import subprocess
import socket
from urllib.parse import urlparse

enc_file="encrypted.pcap"
dec_file="decrypted.pcap"
key_file="sslkeys.txt"
url = "https://www.google.com"

# get IP of URL to visit
parsed_url = urlparse(url)
ip = socket.gethostbyname(parsed_url.netloc)

print("URL: {}".format(url))
print("Keys file path: {}".format(key_file))
print("Encrypted file path: {}".format(enc_file))
print("Decrypted file path: {}".format(dec_file))
print()

# set up enviromental variables
os.environ["SSLKEYLOGFILE"] = key_file

# run tshark and cURL simultaneously
print("tshark -i eth0 -w {} -f \"host {}\" -a duration:5".format(enc_file, ip))
commands = ["tshark -i eth0 -w {} -f \"host {}\" -a duration:5".format(enc_file, ip), "sleep 1 && curl -s {} > /dev/null".format(url)]
processes = [subprocess.Popen(cmd, shell=True) for cmd in commands]
for p in processes: p.wait()

print("Encrypted packets captured!")
print()
print("Decrypting captured packets...")

# decrypt encrypted packets with tshark
subprocess.run("tshark -r {} -o tls.keylog_file:{} -w http2.pcap -U \"OSI layer 7\"".format(enc_file, key_file), shell=True)
subprocess.run("mergecap -w {} {} http2.pcap".format(dec_file, enc_file), shell=True)
print("Decryption complete! Check basic packets info in {}.".format(dec_file))
subprocess.run("rm -f {}".format(key_file), shell=True)
