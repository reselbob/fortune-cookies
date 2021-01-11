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

You'll get an ongoing stream of output similar to the following:

```
fortune_cookie_1  | Writing sentFortune [object Object] at Mon Jan 11 2021 03:02:47 GMT+0000 (Coordinated Universal Time)
fortune_cookie_1  | Executing (default): INSERT INTO `SentFortunes` (`id`,`firstName`,`lastName`,`fortune`,`updatedAt`,`createdAt`) VALUES (?,?,?,?,?,?);
fortune_cookie_1  | Writing sentFortune [object Object] at Mon Jan 11 2021 03:02:47 GMT+0000 (Coordinated Universal Time)
fortune_cookie_1  | Executing (default): INSERT INTO `SentFortunes` (`id`,`firstName`,`lastName`,`fortune`,`updatedAt`,`createdAt`) VALUES (?,?,?,?,?,?);
fortune_cookie_1  | Wrote sentFortune [object Object] at Mon Jan 11 2021 03:02:47 GMT+0000 (Coordinated Universal Time) with SentFortune ID 66142abb-7c96-412a-9cf7-d039487ff40a
fortune_cookie_1  | Wrote SentFortune [object Object] to datasource at Mon Jan 11 2021 03:02:47 GMT+0000 (Coordinated Universal Time)
fortune_cookie_1  | Wrote sentFortune [object Object] at Mon Jan 11 2021 03:02:47 GMT+0000 (Coordinated Universal Time) with SentFortune ID 3bf11400-5070-4684-a1a2-8c9e7520d8c5
fortune_cookie_1  | Wrote SentFortune [object Object] to datasource at Mon Jan 11 2021 03:02:47 GMT+0000 (Coordinated Universal Time)
.
.
.
```

Once the deployment is up and running, it will start sending `sentFortunes` into data in the external MariaDB data. You can use the `report_gen` service to get at that data. The service, `report_gen` runs under`localhost:3003`.

**Step 5:** In a separate terminal window, run `curl ` against the `report_gen` service, like so:

`curl localhost:3003?limit=6`

**WHERE**

* `curl` the command to call the `report_gen` service
* `localhost:3003` is the URL against which `report_gen` is running
* `?limit=6` is the query parameter the declares the number of records to return. If no value is set to `limit`, the default number of records returned is ``0`.

You'll get output as follows:

```
[
{"id":"002f93d1-1210-4d26-b3a1-bb7a8f858d7d","firstName":"Eve","lastName":"Farrell","fortune":"The love of money is the root of all evil.","createdAt":"2021-01-11T03:02:48.000Z","updatedAt":"2021-01-11T03:02:48.000Z"},
{"id":"0048380b-05ba-4921-8e7d-317e7a612051","firstName":"Remington","lastName":"Bechtelar","fortune":"If it's not broke, mess with it till it is.","createdAt":"2021-01-11T03:04:46.000Z","updatedAt":"2021-01-11T03:04:46.000Z"},
{"id":"00639aef-a9b2-46dd-9969-d368fb583433","firstName":"Bette","lastName":"Collins","fortune":"A light purse makes a heavy heart.","createdAt":"2021-01-11T03:02:58.000Z","updatedAt":"2021-01-11T03:02:58.000Z"},
{"id":"008dec1d-272d-4951-b520-3c0f1c2f1235","firstName":"Eve","lastName":"Farrell","fortune":"We cannot erase the sad records from our past.","createdAt":"2021-01-11T03:05:20.000Z","updatedAt":"2021-01-11T03:05:20.000Z"},
{"id":"00a91ce4-d29a-4e92-996f-68927af2ce99","firstName":"Laurine","lastName":"Kirlin","fortune":"Be not a baker if your head is made of butter.","createdAt":"2021-01-11T03:05:21.000Z","updatedAt":"2021-01-11T03:05:21.000Z"},
{"id":"00b35391-3840-4799-b7a2-40963c0f1da6","firstName":"Laurine","lastName":"Kirlin","fortune":"You are what you eat.","createdAt":"2021-01-11T03:04:18.000Z","updatedAt":"2021-01-11T03:04:18.000Z"}
]

```
