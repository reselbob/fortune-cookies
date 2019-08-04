# fortune-cookies
Application the demonstrates a monolithic application to be transformed to a microservices architecture

**Step 1** Go to the Ubuntu Playground on Katacoda

`https://katacoda.com/courses/ubuntu/playground`

(You might have to login or create an account)

**Step 2**: Load in this source code

`git clone https://github.com/reselbob/fortune-cookies.git`

**Step 3**: Navigate the the monolithic version of the application

`cd fortune-cookies/monolith`

**Step 4**: Run the application as a Docker container, first `build` the container image.

`docker build -t monolith` .

**Step 5**: Run the container against the image

`docker run -p 3000:3000 -d  --name fc-monolith monolith`

You should see some screen chatter similiar to this:

```text
Greetings from Ronny McCullough: Take your wife's first advice.
Greetings from Antonio Parker: A single penny fairly got is worth a thousand that are not.
Greetings from Hollis Skiles: He is rich that is satisfied.
Greetings from Carson Pollich: You are what you eat.
Greetings from Gianni O'Conner: You can't make a silk purse out of a sow's ear.
Greetings from Eve Farrell: There's many a slip 'twixt the dock and the ship.
Greetings from Hardy Brakus: You can't teach a new mouse old clicks.
Greetings from Arvilla Hoppe: All's fair in love and war.
Greetings from Remington Bechtelar: Shake the hand before you plough the field.
Greetings from Bette Collins: A friend in need is a friend indeed.
Greetings from Laurine Kirlin: A stitch in time saves nine.
Greetings from Ima Satterfield: Step by step one goes far.
Greetings from Christine Hodkiewicz: Take your wife's first advice.
Greetings from Humberto West: The wise man is deceived once but the fool twice.
Greetings from Addie D'Amore: After dinner rest a while, after supper walk a mile.
```

The monolithic version of the application is now up and running.

**Step 6**: Add a user using `curl`

`curl -X POST 'http://localhost:3000/api/users' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data '{"firstName":"Cool", "lastName":"McCool", "dob":"1979-01-27", "email":"cool.mccool@reallycool.com"}'`