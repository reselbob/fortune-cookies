#!/usr/bin/env bash
#generate the targets, pods first

for filename in ./manifests/redis/*-deployment.yaml; do
    kubectl apply -f "$filename"
done

kubectl apply -f ./manifests/pingrx-pod.yaml

sleep 5

#then targets services
for filename in ./manifests/redis/*-service.yaml; do
    kubectl apply -f "$filename"
done