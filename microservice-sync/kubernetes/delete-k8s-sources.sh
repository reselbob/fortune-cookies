#!/usr/bin/env bash


kubectl delete service email
kubectl delete service facebook
kubectl delete service instagram
kubectl delete service linkedin
kubectl delete service sms
kubectl delete service twitter
kubectl delete service fortunes
kubectl delete service scheduler
kubectl delete service sender
kubectl delete service testconsumer
kubectl delete service user

kubectl delete pod email
kubectl delete pod facebook
kubectl delete pod instagram
kubectl delete pod linkedin
kubectl delete pod sms
kubectl delete pod twitter
kubectl delete pod fortunes
kubectl delete pod scheduler
kubectl delete pod sender
kubectl delete pod testconsumer
kubectl delete pod user