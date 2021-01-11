const express = require("express");
const app = express();

const {getSentFortunes} = require('./dataManager');
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    const fortunes = await getSentFortunes();
    res.json(fortunes);
});

app.use(express.json());

const server = app.listen(port, () => {
    console.log(`Report Gen Server running on port:  ${port} at ${new Date()} on process: ${process.pid}`);
});

const shutdown = async (signal) => {
    let shutdownMessage;

    if (!signal) {
        shutdownMessage = (`${appName} API Server shutting down at ${new Date()}`);
    } else {
        shutdownMessage = (`Signal ${signal} : API Server shutting down at ${new Date()}`);
    }
    const obj = {status: 'SHUTDOWN', shutdownMessage, pid: process.pid};
    await server.close(function () {
        console.log(obj);
        process.exit(0);
    }).catch(err => {
        console.error(err);
        return {status: 'ERROR', err}
    })

};

process.on('SIGTERM', function () {
    shutdown('SIGTERM');
});

process.on('SIGINT', function () {
    shutdown('SIGINT');
});


module.exports = {server, shutdown};
