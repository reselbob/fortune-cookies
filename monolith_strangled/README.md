## Objective
The objective of this lesson is to create a Strangler Lite pattern against the existing monolithic verion of *Fortune Cookies*. Strangler Lite augments the code in the `sender` component of *Fortune Cookies* so that *Fortune Cookies* that have been sent are emitted from the monolith to an independent, external MariaDB database. Once the data is in the MariaDB database, that data is accessible to any interested service.

The project is deployed as Docker containers aggregated under [Docker Compose](https://docs.docker.com/compose/).

The reason the project is called Strangler Lite is because the essential intention of the Strangler Pattern is to remove features from a given application -- in this case the monolithic *Fortune Cookies* project -- in an incremental basis. As features are slowly removed from the legacy application and implemented in a better way in another system, the orginal application becomes "strangled".

Strangler Lite takes the first step of emitting *sent Fortunes* data into another data source. This first step is important because a fundamental principle of microservice oriented architecture (MOA) is that a microservice carries its own data that is not exposed to any other microservice in any way except though an interface provided by the given microservice. Getting *sent Fortunes* data isolated is an important first step that needs to be done regarless of any subsequent decomposition activity. 


## Deployment

**Step 1:** Got to a Katacoda Unbuntu Playground:

`https://katacoda.com/courses/ubuntu/playground`

**Step 2:** Clone the *Fortune Cookies* repository:

`git clone https://github.com/reselbob/fortune-cookies.git`

**Step 3:** Go to the working directory for this "strangled" version of the *Fortune Cookies*:

`cd fortune-cookies/monolith_strangled/`

**Step 4:** Run `docker-compose` to bring up the deployment

`docker-compose up`

Once the deployment is up and running, it will start sending `sentFortunes` into data in the external MariaDB data. You can use the `report_gen` service to get at that data. The service, `report_gen` runs under`localhost:3003`.

**Step 5:** In a separate terminal window, run `curl ` against the `report_gen` service, like so:

`curl localhost:3003?limit=6`

*WHERE**

* `curl` the command to call the `report_gen` service
* `localhost:3003` is the URL against which `report_gen` is running
* `?limit=6` is the query parameter the declares the number of records to return. If no value is set to `limit`, the default number of records returned is ``0`.

You'll get output as follows:

```
TBP

```
