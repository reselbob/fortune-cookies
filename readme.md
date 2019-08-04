# Fortune Cookies

Fortune Cookies is a educational project meant to demonstrate how to convert a single monolithic application into a Microservices Oriented Application (MOA).

The MOA comes in two versions. One version is synchronous using HTTP calls between web servers. The other version is asynchronous. The asynchronous version
uses a message broker to transmit messages between each microservice within the application to faciliate application behavior.

The monolith version is [here](monolith).

The synchronous MOA is [here](microservice-sync).

The asynchronous version of the MOA is [here](microservice-async). The asynchronous version is **very much under construction**.

The monolith and synchronous MOA versions have a set of ReadMe instructions that show you how to get the application up and running under the
[Katacoda](https://katacoda.com/) interactive learning environment. We use Katacoda because it's a free, easy way to spin up virtual machines and Kubernetes
clusters without incuring the risk you'd run if you put the code on your personal computer.

If anything goes wrong all you need to do is refresh the particular Katacoda Playground you're working in.