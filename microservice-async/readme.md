# Setting Up the Asynchronous Version of the Fortune-Cookies MOA to Run Under Kubernetes

**UNDER DEVELOPMENT**

## Setting up the K8S cluster

**Task 1**: Go to the Katacoda K8S interactive learning environment

`https://katacoda.com/courses/kubernetes/helm-package-manager`

**Task 2**: Install `redis`

* Run Step 1, 2, and 3

* Before running Step 4 .....

`mkdir /mnt/data1 & mkdir /mnt/data2 & mkdir /mnt/data3`

* Run Step 4

**Task 3** Set the Kubernetes Password as an environment variable

`export REDIS_PASSWORD=$(kubectl get secret --namespace default viable-sasquatch-redis -o jsonpath="{.data.redis-password}" | base64 --decode`

**Task 4:** Install the `redis-cli` tool in the Katacoda K8S interactive learning environment

`apt update`

`apt install redis-tools -y`

**Task 5**: Get the `redis` password from K8S.

`kubectl get secret --namespace default my-release-redis -o jsonpath="{.data.redis-password}" | base64 --decode`

Save the password in a safe place.


**Task 6:** Create a `redis` client pod.

``` 
kubectl run --namespace default viable-sasquatch-redis-client --rm --tty -i --restart='Never' \
     --env REDIS_PASSWORD=$REDIS_PASSWORD \
    --image docker.io/bitnami/redis:5.0.5-debian-9-r36 -- bash
```

**Task 7:** Do Step 4 in Katacoda`

`git clone https://github.com/reselbob/fortune-cookies.git`

`cd fortune-cookies`


`cd microservice-async/`

`sh docker-seed.sh`

`cd kubernetes`

`sh ./generate-k8s-resources.sh`

`kubectl exec -it pingrx -- sh`

`redis-cli -h redits-master -p 6379`