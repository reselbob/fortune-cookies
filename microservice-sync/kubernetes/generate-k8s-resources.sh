#!/usr/bin/env bash



#generate the targets, pods first
for filename in ./manifests/targets/*-pod.yaml; do
    kubectl apply -f "$filename"
done

#then targets services
for filename in ./manifests/targets/*-service.yaml; do
    kubectl apply -f "$filename"
done


#generate sender
kubectl apply -f ./manifests/sender-pod.yaml
kubectl apply -f ./manifests/sender-service.yaml

#generate scheduler
kubectl apply -f ./manifests/scheduler-pod.yaml
kubectl apply -f ./manifests/scheduler-service.yaml

#generate users
kubectl apply -f ./manifests/users-pod.yaml
kubectl apply -f ./manifests/users-service.yaml

#generate fortunes
kubectl apply -f ./manifests/fortunes-pod.yaml
kubectl apply -f ./manifests/fortunes-service.yaml
