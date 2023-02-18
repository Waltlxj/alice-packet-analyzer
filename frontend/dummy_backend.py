import os
import subprocess
import socket
#from urllib.parse import urlparse
#from scapy.all import *


class AliceBackend:

    """
    AliceDatabase browse theu url, captures the packets, and provides frontend with information extracted from the packets.
    """

    def __init__(self) -> None:
        self.enc_file = "encrypted.pcap"
        self.dec_file = "decrypted.pcap"
        self.key_file = "sslkeys.txt"
        self.url = "https://www.google.com"
        pass

    def browse_and_capture(self, url=None):
        """
        This function browses the provided URL, captures the transmitted packets, and decrypts the packets.
        """

    def get_encrypted_packets(self):
        """
        This function returns the encrypted packets information in a dictionary.
        """
        return {1: "packet1", 2: "packet2", 3: "packet3"}

    def get_decrypted_packets(self):
        """
        This function returns the decrypted packets information in a dictionary.
        """
        return {1: "packet1", 2: "packet2", 3: "packet3"}

    def get_tls_handshake_details(self):
        """
        This function returns crytographic and certificate verification details in the tls handshake.
        """
        return {"info1": "line1", "info2": "line2", "info3": "line3"}

    def get_ip_details(self):
        pass


if __name__ == "__main__":
    # Testing
    backend = AliceBackend()
    backend.browse_and_capture()  # default browsing google
    print(backend.get_encrypted_packets())
    print(backend.get_decrypted_packets())
    print(backend.get_tls_handshake_details())