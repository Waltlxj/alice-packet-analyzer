from scapy.all import *
load_layer("tls")
load_layer("http")
from scapy.sessions import TCPSession
httppackets = rdpcap("http2.pcap")
fulldecrypted = rdpcap("decrypted.pcap")
	if TLS in packet:
		print("tls in packet")
		if isinstance(packet[TLS].msg[0], TLSClientHello):
			print("ClientHello summary: ", packet.summary())

if httppackets[1].haslayer(HTTP):
		print("Http confirmed")
else: print("No http in packet")
print("Http summary: ", httppackets[1].summary())
	
#print(packet.summary())

