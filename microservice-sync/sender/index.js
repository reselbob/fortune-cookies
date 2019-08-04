// BASE SETUP
// =============================================================================

/*
supported message

{
    target: string from the array returned by getTargets()
    payload: the data to send
}

 */

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const axios = require('axios');


const {validateTargets, getTargetApiUrl} = require('./targets');

const getFortune = async () => {
    const url = getDependencyApiUrl('FORTUNE');
    const res = await axios.get(url);
    return res.body.fortune;
};

const send =  async (message) => {
    if(!message.target) throw new Error('no target provided');
    const target = getTargetApiUrl(message.target);
    if (!target) throw new Error(`${message.target} is not a valid target`);

    //Add on the fortune
    message.fortune = await getFortune();

    const url = getTargetApiUrl(message.target);
    return axios.post(url,message.payload)
        .then(response => {
            console.log(response.data);
            return response.data
        })
        .catch(error => {
            console.log(error);
        });
};

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.SENDER_PORT || 3000; // set our port

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log({request:req});
    next();
});

router.route('/')
    .post( async function (req, res) {
        const r = await send(req.body);
        //console.log(`Sending ${JSON.stringify(req.body)} at ${new Date()}`);
        res.statusCode = 200;
        res.json({sent: r});
    });


// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

validateTargets();

const server = app.listen(port);
const shutdown = () => {
    console.log(`Sender Server shutting down at ${new Date()}`);
    server.close()
};

console.log('Sender is listening on port: ' + port);
module.exports = {server, shutdown};

