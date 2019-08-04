const faker = require('faker');
const _ = require('lodash');
const server = require('./server');

const setSenderTargetEnvVars = () =>{
    const targets = getTargets();
    targets.forEach((itm, inx)=>{
        process.env[`${itm}_API_URL`] = `http://localhost:5001?target=${itm}`;
    });
};

const wait =  (timeInMs) => {
    return new Promise(function(resolve) {
        return setTimeout(resolve, timeInMs);
    });
};

const getTargets = ()=> {
    return ['TWITTER','FACEBOOK', 'LINKEDIN','INSTAGRAM','SMS','EMAIL','FORTUNES', 'SENDER'];
};


const createFakeUser = () => {
    const targets = getTargets();

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const dob = faker.date.between('1950-01-01', '2001-12-31').toISOString().slice(0, 10);
    const email = `${firstName}.${lastName}@${faker.internet.domainName()}`;
    const phone = faker.phone.phoneNumber;
    const target = _.sample(['FACEBOOK','TWITTER','INSTAGRAM','SMS', 'EMAIL', 'LINKEDIN']);

    return {firstName, lastName, dob, email,phone,target};
};

const getRandomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const testServer = server.server;
const stopServer = server.shutdown;

module.exports = {getTargets, setSenderTargetEnvVars,  wait, createFakeUser, getRandomIntFromInterval, testServer, stopServer};
