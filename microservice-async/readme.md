# Setting Up the Asynchronous Version of the Fortune-Cookies MOA to Run Under Kubernetes

The purpose of the version of Fortune Cookies is to provide hands-on experience creating a completely event driven MOA
under Kubernetes. The project uses `redis` as the backing service for Message Brokerage.

This set up process does the following:

* Takes you to the Katacoda interactive learning environment where you'll do your work.
* Installs a Docker registry locally in the Katacoda environment.
* Populates the local Docker registry with the container images you'll need. Some of the container images are built directly from
the source code in this project.
* Creates Kubernetes the pods and services the make up the asynchronous MOA using container images
stored in the local Docker registry and out on DockerHub.
* Shows you how to inspect the MOA by querying various services logs in the Kubernetes cluster running in Katacoda.

## Setting up the K8S environment

**Step 1**: Go to the Katacoda K8S interactive learning environment for `minikube`

`https://katacoda.com/courses/kubernetes/kubectl-run-containers`

**Step 2**: Clone the GitHub repo that contains the code

`git clone https://github.com/reselbob/fortune-cookies.git`

**Step 3**: Navigate into the repo

`cd fortune-cookies`

**Step 4**: Go the the asynchronous version of Fortune Cookes

`cd microservice-async/`

**Step 5**: Create a local Docker registry and put the relevant container images in the registry

`sh docker-seed.sh`

**Step 6**: Generate the Kubernestes pods and services

`cd kubernetes`

`sh ./generate-k8s-resources.sh`

**Step 7**: Go into the `pingrx` pod so we can inspect the state of of things from inside the Kubernetes cluster

`kubectl exec -it pingrx -- sh`

**Step 8**: Install `redis-tools` in the `pingrx` containere

`apt-get update && apt-get install redis-tools -y`

**Step 8**: Connect to the `redis` service running under Kubernetes using the `redis-cli` tool.

`redis-cli -h redis-master -p 6379`

**Step 9**: Ping the `redis` installation

`PING`

You should see a result, `PONG`

**Step 10**: Publish a message to `redis` just to make sure all is well.

`PUBLISH testChannel "Hi There!"`

You should see a return value similar to the following:

`(integer) 0`

**Step 11**: Exit out of the `redis` shell:

`exit`

**Step 12**: Exit out of the container

`exit`

**Step 13** Check the `sender` pod for activity

`kubectl logs sender`

**Step 14** Check the `scheduler` pod for activity

`kubectl logs scheduler`

**Step 15** Check the `fortunes` pod for activity

`kubectl logs fortunes`