const express = require("express");
const app = express();

const port = process.env.TEST_UTILS_PORT || 5001;

const getResponseObject = (req, method) =>{
    const obj = {};
    obj.date = new Date();
    obj.method = req.method;
    obj.target = req.query.target || 'none';
    obj.message = `Hello from TestUtilsServer, target ${req.query.target}, method ${obj.method}`;

    return obj;

}

//optional command line param to declare target is, ?target=value
app.get("/", (req, res, next) => {
    res.status = 200;
    res.json(getResponseObject(req, 'GET'));

});

//optional command line param to declare target is, ?target=value
app.post("/", (req, res, next) => {
    res.status = 200;
    res.json(getResponseObject(req, 'POST'));

});



const server = app.listen(port);
console.log(`TestUtils Server started at ${new Date()} and listening on port ${port}`);

const shutdown = () => {
    console.log(`TestUtils Server shutting down at ${new Date()}`);
    server.close()
};

module.exports = {server, shutdown};