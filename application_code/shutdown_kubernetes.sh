#!/bin/bash
kompose down
kubectl delete services my-service
minikube stop
eval $(docker-machine env -u)
./stop_and_remove_containers.sh
