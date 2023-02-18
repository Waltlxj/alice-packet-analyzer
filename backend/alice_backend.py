import os
import subprocess
import socket
from urllib.parse import urlparse
from scapy.all import *
load_layer("tls")
from scapy.layers.tls.handshake import TLSClientHello
import csv


class AliceBackend:
    """
    AliceDatabase browse theu url, captures the packets, and provides frontend with information extracted from the packets.
    """

    def __init__(self) -> None:
        self.enc_file = "encrypted.pcap"
        self.dec_file = "decryptedGoogle.pcap"
        self.key_file = "sslkeys.txt"
        self.url = "https://www.google.com"
        self.packets = None
        pass

    def browse_and_capture(self, url=None):
        """
        This function browses the provided URL, captures the transmitted packets, and decrypts the packets.
        """
        # customize url
        if url:
            self.url = url
        # get IP of URL to visit
        parsed_url = urlparse(self.url)
        ip = socket.gethostbyname(parsed_url.netloc)
        # set up enviromental variables
        os.environ["SSLKEYLOGFILE"] = self.key_file
        # run tshark and cURL simultaneously
        commands = [
            'tshark -i eth0 -w {} -f "host {}" -a duration:5'.format(self.enc_file, ip),
            "sleep 1 && curl -s {} > /dev/null".format(self.url),
        ]
        processes = [subprocess.Popen(cmd, shell=True) for cmd in commands]
        for p in processes:
            p.wait()
        # decrypt encrypted packets with tshark
        subprocess.run(
                'tshark -r {} -o tls.keylog_file:{} -w http2.pcap -U "OSI layer 7"'.format(
                self.enc_file, self.key_file
            ),
            shell=True,
        )
        subprocess.run(
                 "mergecap -w {} {} http2.pcap".format(self.dec_file, self.enc_file),
            shell=True,
        )
        subprocess.run("rm -f {}".format(self.key_file), shell=True)
        return True

    def get_encrypted_packets(self):
        """
        This function returns the encrypted packets information in a dictionary.
        """
        Dict = {}
        idx = 1
        packets = rdpcap(self.enc_file)
        for packet in packets:
            Dict[idx] = packet
            idx+=1
        return Dict

    def get_decrypted_packets(self):
        """
        This function returns the decrypted packets information in a dictionary.
        """
        Dict = {}
        idx = 1
        load_layer("tls")
        packets = rdpcap(self.dec_file)
        for packet in packets:
            Dict[idx] = packet
            idx+=1
        self.packets = packets
        return Dict

    def get_tcp_handshake_details(self):
        packets = rdpcap(self.enc_file)
        tcp_handshake = {}
        for packet in packets:
            if packet[TCP].flags == 2:
                tcp_handshake["syn_seq"] = packet[TCP].seq
                tcp_handshake["syn_sending_port"] = packet[TCP].sport
                tcp_handshake["syn_destination_port"] = packet[TCP].dport
            elif packet[TCP].flags == 18:
                    tcp_handshake["syn_ack_seq"] = packet[TCP].seq
                    tcp_handshake["syn_ack_sending_port"] = packet[TCP].sport
                    tcp_handshake["syn_ack_destination_port"] = packet[TCP].dport
            elif packet[TCP].flags == 16:
                    tcp_handshake["ack_seq"] = packet[TCP].seq
                    tcp_handshake["ack_sending_port"] = packet[TCP].sport
                    tcp_handshake["ack_destination_port"] = packet[TCP].dport
        """
        This function returns connection details from the tcp handshake(sequence numbers, port numbers, etc.)
        """

        return tcp_handshake
    
    def get_tls_handshake_details(self):
    	tls_dictionary = {}
    	with open('tls-parameters-4.csv', mode='r') as infile:
    		reader = csv.reader(infile)
    		mydict = {rows[0]:rows[1] for rows in reader}
    	newdict = {}
    	for k,v in mydict.items():
    		k = int((k[2:4]+k[7:9]), 16)
    		newdict[k] = v
    		
    	with open('tls-signaturescheme.csv', mode='r') as infile:
    		reader = csv.reader(infile)
    		tempdict = {rows[0]:rows[1] for rows in reader}
    	signaturedict = {}
    	for k,v in tempdict.items():
    		k = int((k[2:6]), 16)
    		signaturedict[k] = v
    	packets = rdpcap(self.dec_file)
    	for packet in packets:
    		if TLS in packet:
    			if packet[TLS].type == 22:
    				if packet[TLS].msg[0].msgtype == 1:
    					ciphers = packet[TLS].msg[0].ciphers
    					cipherlist = []
    					for val in ciphers:
    						val = newdict[val]
    						cipherlist.append(val)
    					sig_algs = packet[TLS].msg[0].ext[8].sig_algs
    					signaturelist = []
    					for i in range(len(sig_algs)):
    						if sig_algs[i] not in signaturedict.keys():
    							signaturelist.append("UNKNOWN-" + str(i))
    						else:
    							signaturelist.append(signaturedict[sig_algs[i]])
    					tls_dictionary["client_hello_signature_options"] = signaturelist
    					tls_dictionary["client_hello_encryption_options"] = cipherlist
    				elif packet[TLS].msg[0].msgtype == 2:
    					cipher = packet[TLS].msg[0].cipher
    					cipher = newdict[cipher]
    					tls_dictionary["server_hello_encryption_selection"] = cipher
    					
    	return tls_dictionary
    
    def get_ip_details(self):
        packets = rdpcap(self.enc_file)
        ip_dictionary = {}
        for packet in packets:
            if TCP in packet:
                if packet[TCP].flags == 2:
                    ip_dictionary["ClientIP"] = packet[IP].src
                    ip_dictionary["ServerIP"] = packet[IP].dst
                    ip_dictionary["IP_version"] = packet[IP].version
        """
        This function returns ip information for the connection(IP addresses, version no., etc.)
        """
        return ip_dictionary




if __name__ == "__main__":
    # Testing
    backend = AliceBackend()
    backend.browse_and_capture()  # default browsing google
    #print(backend.get_encrypted_packets())
    #print(backend.get_decrypted_packets())
    print(backend.get_tls_handshake_details())
    print(backend.get_ip_details())
    print(backend.get_tcp_handshake_details())
