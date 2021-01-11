## Objective
The objective of this lesson is to create a strangler lite pattern against an existing monolith

Tested in Katacoda Minikube environment on Ubuntu 18.04

## Steps

**Step X:** Start Minikube

`minikube start` {{execute}}

You should see that Minikube has started in your Katakoda environment

**Step X:** Pull the repo

`git clone https://github.com/reselbob/fortune-cookies.git` {{execute}}

**Step X:** Start our Redis container in docker, exposing the port on our container

`docker run -d --name redis -p 6379:6379 redis` {{execute}}

**Step X:** Create our local docker volume

`docker volume create fortunedb-volume` {{execute}}

**Step X:** Start our MySQL container in docker, exposing our volume, the port for the access, and configuration

`docker run --name fortunedb -p3306:3306 -v fortunedb-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=fortunedb -d mysql:5.7` {{execute}}

**Step X:** Access a bash shell in the MySQL Container

`docker exec -it fortunedb bash` {{execute}}

**Step X:** Create Fortunes DB in MySQL

In Mysql Container

`mysql -u root -p` {{execute}}

Enter `password` to access the MySQL CLI

mysql> `use fortunedb;`
mysql> 
`create table fortunes (
    fortune_id INT NOT NULL AUTO_INCREMENT,
    fortune_sender VARCHAR(256) NOT NULL,
    fortune VARCHAR(256) NOT NULL,
    fortune_date DATE,
    PRIMARY KEY (fortune_id)
     );`
     
 mysql> `quit`
 
 #> `exit`

**Step X:**  Retrieve the IP for our Minikube environment
 
`minikube ip` {{execute}}

**Step X:** Change to the working directory for the Report Generator for Fortune Cookies

`cd ~/fortune-cookies/report_gen` {{execute}}

**Step X:** Install the NodeJS Express module we use for our report server

`npm install express` {{execute}}

**Step X:** Edit the index.js in the report_gen folder to update the host IP address

Update index.js host in vi from the output we receive when executing `minikube ip` 


**Step X:** Change to the working directory for the Report Generator for Fortune Cookies

`cd ~/fortune-cookies/monolith/sender` {{execute}}

**Step X:** Edit the index.js in the report_gen folder to update the host IP address

Update index.js host (2 places for Redis and MySQL) in vi from the output we receive when executing `minikube ip` 


**Step X:** Change to the working directory for our Fortune Cookies monolith

`cd ~/fortune-cookies/monolith` {{execute}}

**Step X:** Install the redis NodeJS module via NPM

`npm install redis` {{execute}}

**Step X:** Install the mysql NodeJS module via NPM

`npm install mysql` {{execute}}

**Step X:** Build our monolith with the updated Sender using the containerized MySQL and Redis applications

`docker build -t monolith .` {{execute}}

Don't forget the period

**Step X:** Start our monolith with our updated sender using our containerized MySQL and Redis environments

`docker run -p 3000:3000 -d --name fc-monolith monolith` {{execute}}

**Step X:** Validate that we're seeing the Messages and DB insertions in the log

`docker logs --tail 500 fc-monolith` {{execute}}

We should see something like the following from our log tail

Greetings from Avery Doyle: It is easier to destroy than to build.

Greetings from Laurine Kirlin: If at first you don't succeed, skydiving is not for you.

Greetings from Bette Collins: Love does much but money does all.

Greetings from Monte Weber: Never quarrel with one's bread and butter.

1 record inserted into fortunedb:fortunes

1 record inserted into fortunedb:fortunes

1 record inserted into fortunedb:fortunes

1 record inserted into fortunedb:fortunes


If there were a typo in the files, we failed to start a container for Redis correctly, had an issue with the MySQL DB/Table creation, or didn't correctly update the host port for the Redis or MySQL in our Sender NodeJS service we'll need to remediate and then, stop, remove, rebuilt and re-run our monolith.

**Step Y:** View the error and resolve then

`docker stop fc-monolith` {{execute}}
`docker remove fc-monolith` {{execute}}
`docker build -t monolith .` {{execute}}
`docker run -p 3000:3000 -d --name fc-monolith monolith` {{execute}}

Then review the logs again

**Step X:** Change to our Report Generator server application folder

`cd ~/fortune-cookies/report_gen` {{execute}}


**Step X:** Change to our Report Generator server application folder

`node index.js` {{execute}}


**Step X:** Open a browser to view the report selecting to view Host 1 using port 3333

We should see something like the following

Hardy Brakus: There is no better looking-glass than an old friend.

Remington Bechtelar: Love does much but money does all.

Avery Doyle: As is the gardener so is the garden.

Humberto West: You are what you eat.

Bette Collins: Not in a month of Sundays.

Monte Weber: Everybody must row with the oars he has.

Laurine Kirlin: It's an old dog for a hard road.

Addie D'Amore: Call a spade a spade.

Sedrick Hilpert: Hasty climbers have sudden falls.

Hollis Skiles: Since before cocky was an egg.


## Summary

In this lesson you got our monolith up and running using Docker containers for the datastore(MySQL) and key-value store(Redis). In addition, we externalized our Report Generation application making it a separate report generating microservice.

----


**Next: More cool nerd stuff from Innovation in Software**
