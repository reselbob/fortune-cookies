#!/usr/bin/env bash

#Create the local repo
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#Create the pingrx container image
cd pingrx

docker build -t pingrx .

docker tag pingrx localhost:5000/pingrx

docker push localhost:5000/pingrx


#Create the sender container image
cd sender

docker build -t sender .

docker tag sender localhost:5000/sender

docker push localhost:5000/sender

cd ..
#Create the scheduler container image

cd scheduler

docker build -t scheduler .

docker tag scheduler localhost:5000/scheduler

docker push localhost:5000/scheduler

cd ..


#List the images in the registry

curl http://localhost:5000/v2/_catalog
