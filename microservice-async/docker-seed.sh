#!/usr/bin/env bash

#Create the local repo
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#Create the pingrx container image
cd pingrx

docker build -t pingrx .

docker tag pingrx localhost:5000/pingrx

docker push localhost:5000/pingrx

cd ..
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

#Create the fortunes container image


cd fortunes

docker build -t fortunes .

docker tag fortunes localhost:5000/fortunes

docker push localhost:5000/fortunes

cd ..

# users

cd users

docker build -t users .

docker tag users localhost:5000/users

docker push localhost:5000/users

cd ..

# message-gen

cd message-gen

docker build -t message-gen .

docker tag message-gen localhost:5000/message-gen

docker push localhost:5000/message-gen

cd ..

#List the images in the registry

curl http://localhost:5000/v2/_catalog
