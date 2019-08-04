#!/usr/bin/env bash

#create the local repo and containers
sh ././../docker-seed/docker-seed.sh

#generate the targets, pods first
for filename in ./manifests/targets/*-pod.yaml; do
    echo "$filename"
done

#then targets services
for filename in ./manifests/targets/*-service.yaml; do
    echo "$filename"
done

#generate fortunes
kubectl apply -f ./manifests/fortunes-pod.yaml
kubectl apply -f ./manifests/fortunes-service.yaml

#generate sender
kubectl apply -f ./manifests/sender-pod.yaml
kubectl apply -f ./manifests/sender-service.yaml

#generate scheduler
kubectl apply -f ./manifests/scheduler-pod.yaml
kubectl apply -f ./manifests/scheduler-service.yaml

#generate userss
kubectl apply -f ./manifests/users-pod.yaml
kubectl apply -f ./manifests/users-service.yaml
