#!/bin/bash
./docker_host.sh
./stop_and_remove_containers.sh
minikube start
eval $(minikube docker-env)
kompose up
kubectl expose deployment node --type=NodePort --name=my-service
minikube service my-service --url