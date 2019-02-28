#!/bin/bash
./build.sh

ssh -i ~/.ssh/capstone-2019.pem ec2-user@54.191.200.168 'bash -s'<< EOF




EOF