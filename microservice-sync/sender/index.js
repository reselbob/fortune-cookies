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
    const url = getTargetApiUrl('FORTUNES');
    const res = await axios.get(url);
    if(!res.data){
        console.log(`There is a problem on Sender.getFortune response is ${JSON.stringify(res.data)}`);
    }else{
        console.log(`The response data for Sender.getFortune is ${JSON.stringify(res.data)}`);
    }

    return res.data;
};

const send =  async (message) => {
    if(!message.target) throw new Error('no target provided');
    const target = getTargetApiUrl(message.target);
    if (!target) throw new Error(`${message.target} is not a valid target`);

    const fortune = await getFortune();
    //Add on the fortune
    if( message.payload){
        message.payload.fortune =  fortune;
    }else{
        message.payload = fortune;
    }

    let url;
    if(message.target){
        url = getTargetApiUrl(message.target.toUpperCase());
    }
    console.log(`Sending the message ${JSON.stringify(message)} to ${url} at ${new Date()}`);
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(message.payload),
        url
    };
    return axios(options)
        .then(response => {
            console.log(`Sent the message ${JSON.stringify(message)} to ${url} at ${new Date()} response data ${JSON.stringify(response.data)}`);
            return response.data
        })
        .catch(error => {
            console.log(JSON.stringify({err:error}));
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
        console.log(`Sending ${JSON.stringify(req.body)} at ${new Date()}`);
        const r = await send(req.body);
        console.log(`Sent ${JSON.stringify(req.body)} at ${new Date()} response ${r}`);
        res.statusCode = 200;
        res.send(JSON.stringify({sent: r}));
        res.end();
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

