// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const {validateTopics,sendToTopic, topics} = require('./targets');
const {validateSenderMessage} = require('validators');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // set our port

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log({request:req});
    next();
});

router.route('/')
    .post = async(req, res) => {
        validateSenderMessage(req.body);
        console.log(`Sending ${JSON.stringify(req.body)} at ${new Date()}`);
        const result = await sendToTopic(req.body.topic, req.body.payload);
        res.statusCode = 200;
        res.json({result });
    };

router.route('/topics')
    .get = async (req, res) => {
        console.log(`Returning topics ${JSON.stringify(topics)} at ${new Date()}`);
        res.statusCode = 200;
        res.json({topics });
    };


// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

validateTopics();

const server = app.listen(port);
const shutdown = () => {
    console.log(`Sender Server shutting down at ${new Date()}`);
    server.close()
};

console.log('Listening on port: ' + port);
module.exports = {server, shutdown};

