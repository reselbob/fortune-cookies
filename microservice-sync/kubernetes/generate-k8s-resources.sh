#!/usr/bin/env bash



#generate the targets, pods first
for filename in ./manifests/targets/*-pod.yaml; do
    kubectl apply -f "$filename"
done

kubectl apply -f ./manifests/sender-pod.yaml
kubectl apply -f ./manifests/scheduler-pod.yaml
kubectl apply -f ./manifests/users-pod.yaml
kubectl apply -f ./manifests/fortunes-pod.yaml

sleep 5

#then targets services
for filename in ./manifests/targets/*-service.yaml; do
    kubectl apply -f "$filename"
done



kubectl apply -f ./manifests/sender-service.yaml
kubectl apply -f ./manifests/scheduler-service.yaml
kubectl apply -f ./manifests/users-service.yaml
kubectl apply -f ./manifests/fortunes-service.yaml