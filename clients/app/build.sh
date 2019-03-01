#!/bin/bash
docker build -t uwkoma/app-nginx:latest .
docker push uwkoma/app-nginx:latest