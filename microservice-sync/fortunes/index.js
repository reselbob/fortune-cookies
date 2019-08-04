// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

const {getRandomFortune} = require('./dataManager');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.FORTUNE_PORT || 3000; // set our port

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log({response:res});
    next();
});

router.route('/')
    .get( async (req, res) => {
        //const fortune = await getRandomFortune();
        const fortune = await getRandomFortune();
        const str = JSON.stringify(fortune);
        console.log(`Sending fortune ${str} at ${new Date()}`)
        res.send(str ).end();
    });


// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

const server = app.listen(port);
const shutdown = () => {
    console.log(`Fortunes Server shutting down at ${new Date()}`);
    server.close()
};

console.log(`Fortunes started at ${new Date()} and listening on port ${port}`);
module.exports = {server, shutdown};

