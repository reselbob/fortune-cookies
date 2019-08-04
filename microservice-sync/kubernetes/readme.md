# Setting up Microservices Sync to Run Under Minikube

**Step 1:** Go to Katacoda's Minikube Playground (You might have to register with Katacoda. It's free.)

`https://katacoda.com/courses/kubernetes/kubectl-run-containers`

Once in the Playground, click the instruction on the left panel, `minikube start`.

This will startup Kubernetes running as a [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/#interacting-with-your-cluster) instance.

**Step 2:** Download this repo into Katacoda. A the command line type:

`git clone https://github.com/reselbob/fortune-cookies.git`

**Step 3:** Navigate to the` microservices-sync` directory

`cd fortune-cookies/microservices-sync`

**Step 4:** Install a local Docker Registry

`docker run -d -p 5000:5000 --restart=always --name registry registry:2`

For more information about local Docker registries go [here](https://sethlakowske.com/articles/howto-install-docker-kubernets-local-registry/).

**Step 5:** Build a `fortunes` [container image](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/containers_and_images.html)
and push it to the local Docker Registry.

`cd fortunes`

`docker build -t fortunes .`

`docker tag fortunes localhost:5000/fortunes`

`docker push localhost:5000/fortunes`

**Step 6:** Do a test run to make sure you can access the local Docker Repository

`docker run -d -p 3000:3000 localhost:5000/fortunes3000`

**Step 7:** Build a `testconsumer` container image and push it to the  local Docker Registry.

`cd ../testconsumer`

`docker build -t testconsumer .`

`docker tag testconsumer localhost:5000/testconsumer`

`docker push localhost:5000/testconsumer`

**Step 8:** Create `fortunes` pod and service

`cd ../kubenetes/manifests`

`kubectl apply -f fortunes-pod.yaml`

`kubectl apply -f fortunes-service.yaml`

**Step 9:** Create `testconsumer` pod and service

`kubectl apply -f testconsumer-pod.yaml`

`kubectl apply -f testconsumer-service.yaml`

**Step 10:** Get the `url` of the `testconsumer` services

`minikube service hello-minikube --url`

This will return a `url` similar the following:

`http://172.17.0.33:30655`

**Step 11:** Test the deployment by calling the service, `testconsumer` using `curl`.

`curl <YOUR_URL>`


