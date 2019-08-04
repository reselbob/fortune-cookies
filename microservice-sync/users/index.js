// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const {validateDependencyApiUrls} = require('./dependencies');

const {getUsers, addUser, getUsersSync, getUser, deleteUser, updateUser} = require('./dataManager');

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
    .post(function (req, res) {
        addUser(req.body)
            .then(rslt =>{
                //Clean up the json so as not create a circular issue
                res.json({id: rslt.id, firstName: rslt.firstName, lastName: rslt.lastName, dob: rslt.dob, email:rslt.email });
            })
            .catch(e => {
                res.error(e);
            });
    })
    .get( async (req, res) => {
        const users = await getUsers();
        res.json(users);
    });

router.route('/:userId')
    .get(async function (req, res) {
        if(! req.params.id) throw new Error('No id provided for user');
        const user = await getUser(req.params.id);
        res.json(user);
    })
    .put(function (req, res) {
        if(! req.params.id) throw new Error('No id provided for user');
        const result = updateUser(req.body);
        res.json(result);
    })
    .delete( async function (req, res) {
        if(! req.params.id) throw new Error('No id provided for user');
        const result = await deleteUser(req.params.userId)
        res.json(result);
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

//Make sure all the dependencies are in place
validateDependencyApiUrls();

const server = app.listen(port);
const shutdown = () => {
    console.log(`User Server shutting down at ${new Date()}`);
    server.close()
};

console.log(`Users started at ${new Date()} and listening on port ${port}`);
module.exports = {server, shutdown};

