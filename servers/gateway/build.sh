#!/bin/bash
GOOS=linux go build
docker build -t uwkoma/gateway:latest .
docker push uwkoma/gateway:latest

go clean
