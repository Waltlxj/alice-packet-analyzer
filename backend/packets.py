from scapy.all import *

#from scapy.layers.tls import *
load_layer("tls")
from scapy.layers.tls.handshake import TLSClientHello
import csv
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
packets = rdpcap("decrypted.pcap")
f = open("Packetdata.txt", "w")
for packet in packets:
	if TLS in packet:
		test = packet[TLS].type
		if test == 22:
			if packet[TLS].msg[0].msgtype == 1:
				f.write("ClientHello" + "\n")
				f.write("Sending IP: " + packet[IP].src + "\n")
				f.write("Receiving IP: " + packet[IP].dst + "\n")
				f.write("IP version: ")
				f.write(str(packet[IP].version) + "\n")
				f.write("TCP Seq Number: " + str(packet[TCP].seq) + "\n")
				f.write("TCP Sending port: " + str(packet[TCP].sport) + "\n")
				f.write("TCP Receiving port: " + str(packet[TCP].dport) + "\n")
				ciphers = packet[TLS].msg[0].ciphers
				f.write("TLS cipher options: ")
				for val in ciphers:
					val = newdict[val]
					f.write(val + ",")
				f.write("\n")
				sig_algs = packet[TLS].msg[0].ext[8].sig_algs
				f.write("Signature algorithms: ")
				for i in range(len(sig_algs)):
					if sig_algs[i] not in signaturedict.keys():
						f.write("UNKNOWN-" + str(i) + ",")
					else:
						f.write(signaturedict[sig_algs[i]] + ",")
				f.write("\n")
			elif packet[TLS].msg[0].msgtype == 2:
				f.write("ServerHello" + "\n")
				f.write("Sending IP: " + packet[IP].src + "\n")
				f.write("Receiving IP: " + packet[IP].dst + "\n")
				f.write("IP version: ")
				f.write(str(packet[IP].version) + "\n")
				f.write("TCP Seq Number: " + str(packet[TCP].seq) + "\n")
				f.write("TCP Sending port: " + str(packet[TCP].sport) + "\n")
				f.write("TCP Receiving port: " + str(packet[TCP].dport) + "\n")
				cipher = packet[TLS].msg[0].cipher
				f.write("TLS cipher selection: ")
				cipher = newdict[cipher]
				f.write(cipher + "\n")
				f.close()


#print (isinstance(packet[TLS].msg[0], TLSClientHello))
#if packet[TCP].flags == 18:
