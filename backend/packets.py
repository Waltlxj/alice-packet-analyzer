from scapy.all import *


load_layer("tls")
from scapy.layers.tls.handshake import *
packets = rdpcap("decrypted.pcap")
for packet in packets:
	if TCP in packet:
		print(packet[TCP].seq)
	#print(packets[9].show())



#if packet[TCP].flags == 18:
