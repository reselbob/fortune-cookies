#!/usr/bin/env bash

#Create the local repo
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#Create the fortunes container image
cd fortunes

docker build -t fortunes .

docker tag fortunes localhost:5000/fortunes

docker push localhost:5000/fortunes

cd ..
#Create the scheduler container image

cd scheduler

docker build -t scheduler .

docker tag scheduler localhost:5000/scheduler

docker push localhost:5000/scheduler

cd ..

#Create the sender container image
cd sender

docker build -t sender .

docker tag sender localhost:5000/sender

docker push localhost:5000/sender

cd ..

#Create the targetmockserver container image
cd targetmockserver

docker build -t targetmockserver .

docker tag targetmockserver localhost:5000/targetmockserver

docker push localhost:5000/targetmockserver

cd ..

#Create the testconsumer container image

cd testconsumer

docker build -t testconsumer .

docker tag testconsumer localhost:5000/testconsumer

docker push localhost:5000/testconsumer

cd ..

#Create the users container image
cd users

docker build -t users .

docker tag users localhost:5000/users

docker push localhost:5000/users

cd ..

#List the images in the registry

curl http://localhost:5000/v2/_catalog
