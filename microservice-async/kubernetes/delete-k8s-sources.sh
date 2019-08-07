#!/usr/bin/env bash


kubectl delete service pingrx
kubectl delete service scheduler
kubectl delete service sender

kubectl delete pod pingrx
kubectl delete pod scheduler
kubectl delete pod sender