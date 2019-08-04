#!/usr/bin/env bash

#Create the local repo
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#Create the fortunes container image

docker build -t fortunes -f ./fortunes/Dockerfile .

docker tag fortunes localhost:5000/fortunes

docker push localhost:5000/fortunes

#Create the scheduler container image

docker build -t scheduler -f ./scheduler/Dockerfile .

docker tag scheduler localhost:5000/scheduler

docker push localhost:5000/scheduler

#Create the sender container image
docker build -t sender -f ./sender/Dockerfile .

docker tag sender localhost:5000/sender

docker push localhost:5000/sender

#Create the targetmockserver container image
docker build -t targetmockserver -f ./targetmockserver/Dockerfile .

docker tag targetmockserver localhost:5000/targetmockserver

docker push localhost:5000/targetmockserver

#Create the testconsumer container image
docker build -t testconsumer -f ./testconsumer/Dockerfile .

docker tag testconsumer localhost:5000/testconsumer

docker push localhost:5000/testconsumer

#Create the users container image
docker build -t users -f ./users/Dockerfile .

docker tag users localhost:5000/users

docker push localhost:5000/users

#List the images in the registry

curl http://localhost:5000/v2/_catalog
