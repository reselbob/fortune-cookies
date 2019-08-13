const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {validateEnvVars, getDependencyEnvVar, Subscriber, Publisher} = require('./messageBroker');
const {createFakeUser} =  require('./test/test-utils')

const port = process.env.PORT || 3000;

validateEnvVars();
const getTargets = () =>{
    return ['FORTUNES','SCHEDULER','SENDER','USERS']
}

const publishToTarget = async (message, response) => {
    const res = response;
    if(!message.target)throw new Error("No required property, target defined for the message generator");
    if(!message.payload)throw new Error("No required property, payload defined for the message generator");
    let target;
    switch (message.target.toUpperCase()){
        case 'SENDER':
            target = getDependencyEnvVar('SENDER_SOURCE_TOPIC');
            break;
        case 'SCHEDULER':
            target = getDependencyEnvVar('SCHEDULER_SOURCE_TOPIC');
            break;
        case 'FORTUNES':
            target = getDependencyEnvVar('FORTUNES_SOURCE_TOPIC');
            break;
        case 'USERS':
            target = getDependencyEnvVar('USERS_SOURCE_TOPIC');
            break;
    }
    if(!target){
        throw new Error(`No target environment variable found for target, ${message.target}`);
        return;
    }
    const publisher = new Publisher(target);
    const str = JSON.stringify(message.payload);
    console.log(`Message Gen is publishing payload ${str} at ${new Date()}`);
    await publisher.publish(str);
    publisher.close();
    console.log(`Message Gen published payload ${str} at ${new Date()}`);

    return {status: 'OK', date: new Date()};
};

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// create our router
const router = express.Router();

// middleware to use for all requests

app.use('/', router);

router.use(function (req, res, next) {
    // do logging
    console.log({request: req});
    next();
})

router.route('/')
    .post(async function (req, res) {
        console.log(`Received POST ${JSON.stringify(req.body)} at ${new Date()}`);
        await publishToTarget(req.body, res);
        res.statusCode = 200;
        res.send('OK');
        res.end();
    });

router.route('/targets')
    .get(function (req, res) {
        console.log(`Received GET at ${new Date()}`);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify({targets: getTargets()})).end();
    });
router.route('/random/user')
    .get(function (req, res) {
        const user = createFakeUser();
        console.log(`Sending random user ${JSON.stringify(user)} GET at ${new Date()}`);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify(user)).end();
    });


const server = app.listen(port);
console.log(`Message Gen Server started at ${new Date()} on port ${port}`);

const shutdown = () => {
    console.log(`Message Gen Server shutting down at ${new Date()}`);
    server.close()
};


module.exports = {server, shutdown};