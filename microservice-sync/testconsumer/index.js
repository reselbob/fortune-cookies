const {validateDependencyApiUrls, getDependencyApiUrl} = require('./dependencies');
const axios = require('axios');
const express = require("express");
const app = express();
const port = process.env.TEST_CONSUMER_PORT || 3000;

const getFortune = async()=> {
    const url  = getDependencyApiUrl('FORTUNE');
    console.log(`Axios is trying to call ${url}`);
    return axios.get(url)
        .then(res => {
            return res.data.fortune;
        })
        .catch(error => {
            throw error;
        });
};



validateDependencyApiUrls();

app.get("/", (req, res, next) => {
    return getFortune()
        .then(fortune =>{
            console.log(`Returning fortune from test consumer: ${fortune} at ${new Date()}`);
            res.status = 200;
            res.end(fortune);
        })
        .catch(err => {
            res.status = 500;
            console.log(`Error: ${err}`);
            console.log(`Stack: ${err.stack}`);
            res.json(err);
        })
});

app.listen(port, () => {
    console.log(`TestConsumer Server running on port ${port}`);
});
