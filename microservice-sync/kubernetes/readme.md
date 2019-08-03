# Setting up Microservices Sync to Run Under Minikube

**Step 1:** Go to Katacoda's Minikube Playground (You might have to register with Katacoda. It's free.)

`https://katacoda.com/courses/kubernetes/kubectl-run-containers`

Once in the Playground, click the instruction on the left panel, `minikube start`.

This will startup Kubernetes running as a [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/#interacting-with-your-cluster) instance.

**Step 3:** Download this repo into Katacoda. A the command line type:

`git clone https://github.com/reselbob/fortune-cookies.git`

**Step 4:** Navigate to the` microservices-sync` directory

`cd fortune-cookies/microservices-sync`

**Step 5:** Install a local Docker Registry

`docker run -d -p 5000:5000 --restart=always --name registry registry:2`

For more information about local Docker registries go [here](https://sethlakowske.com/articles/howto-install-docker-kubernets-local-registry/).

**Step 6:** Build a `fortunes` [container image](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/containers_and_images.html)
and push it to the local Docker Registry.


**Step 7:** Build a `testconsumer` container image and push it to the  local Docker Registry.