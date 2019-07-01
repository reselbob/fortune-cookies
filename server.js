// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const morgan     = require('morgan');
const {loadScheduleItems} = require('./scheduler');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port     = process.env.PORT || 8080; // set our port

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Fortune Cookies API!' });
});

router.route('/users')
    .post(function(req, res) {
        console.log(req.body.name);
        res.json({ message: 'Not Implemented: POST /users' });
    })
    .get(function(req, res) {
        res.json({ message: 'Not Implemented; GET /users' });
    });


router.route('/users/:userID')
    .get(function(req, res) {
        res.json({ message: 'Not Implemented: GET /users/:userID' });
    })
    .put(function(req, res) {
        res.json({ message: 'Not Implemented: PUT /users/:userID' });
    })
    .delete(function(req, res) {
        res.json({ message: 'Not Implemented: DELETE /users/:userID' });
    });

router.route('/reports/users')
    .get(function(req, res) {
        res.json({ message: 'Not Implemented: GET /reports/users' });
    });
router.route('/reports/users/:userID')
    .get(function(req, res) {
        res.json({ message: 'Not Implemented: /reports/users/:userID' });
    });
router.route('/reports/usage')
    .get(function(req, res) {
        res.json({ message: 'Not Implemented: GET /reports/usage' });
    });
// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

//Load in the existing cron jobs
const globalSchedulerArray = [];

loadScheduleItems(globalSchedulerArray)
    .then(arr =>{
        const server = app.listen(port);
        console.log('Listening on port: ' + port);
        module.exports = server;
    });


// START THE SERVER
// =============================================================================


