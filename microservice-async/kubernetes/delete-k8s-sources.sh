#!/usr/bin/env bash


kubectl delete service scheduler
kubectl delete service sender
kubectl delete service fortunes

kubectl delete pod pingrx
kubectl delete pod scheduler
kubectl delete pod sender
kubectl delete pod fortunes