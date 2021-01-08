# Getting the Monolithic Version of Fortune Cookies Up and Running

Application the demonstrates a monolithic application to be transformed to a microservices architecture

(View the architecture diagram [here](./architecture.md).)

**Step 1** Go to the Ubuntu Playground on Katacoda

`https://katacoda.com/courses/ubuntu/playground`

(You might have to login or create an account)

**Step 2**: Load in this source code into Katacoda

`git clone https://github.com/reselbob/fortune-cookies.git`

**Step 3**: Navigate the monolithic_v2 version of the application

`cd fortune-cookies/monolith_v2`

**Step 4**: Install the external dependencies

`npm install`

**Step 5**: In a second terminal window invoke `mariadb` database under `docker-compose`

`docker-compose up`

**Step 6:** Start the web server

`node server.js`

You should see some screen chatter similar to this:

```text
TO BE PROVIDED
```

The monolithic version of the application is now up and running.

**Step 6**: In a separate terminal window, add a user using `curl`

`curl -X POST 'http://localhost:3000/api/users' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data '{"firstName":"Cool", "lastName":"McCool", "dob":"1979-01-27", "email":"cool.mccool@reallycool.com"}'`

If a user is saved to the system, the user data will be returned with a system assigned `id`, similar to the following:

`{"id":"89b689dd-0f94-43f1-93d8-e1fa2564fd4d","firstName":"Cool","lastName":"McCool","dob":"1979-01-27"}`

**Step 7** Execute the following command to see if Cool McCool is active.

```text

TO BE PROVIDED

```


Now, when you take a look at the logs again, you will see that Cool McCool is sending fortunes out too with output similar to this:

```text

TO BE PROVIDED

```
