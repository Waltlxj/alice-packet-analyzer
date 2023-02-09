#!/bin/sh

# This bash script runs cURL to visit a website and tshark to capture and decrypt the transmitted TLS packets.
# Dependencies: cURl, tshark, mergecap

usage() 
{
  echo "Usage: alice.sh [ -e | --encrypted ENC_FILE ] 
                [ -d | --decrypted DEC_FILE]
                [ -k | --key KEY_FILE ]
                url"
  exit 2
}

# Default values
ENC_FILE="encrypted.pcap"
DEC_FILE="decrypted.pcap"
KEY_FILE="sslkeys.txt"
URL=unset

# parse arguments
PARSED_ARGUMENTS=$(getopt -a -n alice -o he:d:k: --long help,encrypted:,decrypted:,key: -- "$@")

echo "Script started..."
echo
eval set -- "$PARSED_ARGUMENTS"
while :
do
  case "$1" in
    -h | --help)        usage ;;
    -e | --encrypted)   ENC_FILE=$2      ; shift 2 ;;
    -d | --decrypted)   DEC_FILE=$2      ; shift 2 ;;
    -k | --key)         KEY_FILE=$2      ; shift 2 ;;
    # -- means the end of the arguments; drop this, and break out of the while loop
    --) shift; break ;;
    # If invalid options were passed, then getopt should have reported an error,
    # which we checked as VALID_ARGUMENTS when getopt was called...
    *) echo "Unexpected option: $1"
       usage ;;
  esac
done

if [ $# -eq 0 ]; then
    echo "URL not provided, browsing google.com by default"
    URL="https://www.google.com"
else
    URL=$@
fi

echo "URL: $URL"
echo "Keys file path: $KEY_FILE"
echo "Encrypted file path: $ENC_FILE"
echo "Decrypted file path: $DEC_FILE"
echo 

# set up SSLKEYLOGFILE env var
export SSLKEYLOGFILE=$KEY_FILE

# running tshark and curl simultaneously
echo "cURL browsing $URL..."
echo
tshark -i eth0 -w $ENC_FILE -a duration:5 & sleep 1 && curl -s $URL > /dev/null
wait

echo
echo "Encrypted packets captured!"
echo
echo "Decrypting captured packets..."
echo

tshark -r $ENC_FILE -o tls.keylog_file:$KEY_FILE -w http2.pcap -U "OSI layer 7"
mergecap -w $DEC_FILE $ENC_FILE http2.pcap

echo "Decryption complete! Check basic packets info in $DEC_FILE."