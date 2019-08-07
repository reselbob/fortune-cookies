const faker = require('faker');
const util = require('util');
const setIntervalPromise = util.promisify(setInterval);

const {validateEnvVars, getDependencyEnvVar, Publisher} = require('../messageBroker');

const publisher = new Publisher(getDependencyEnvVar('FORTUNES_SOURCE_TOPIC'));

validateEnvVars();

setIntervalPromise(() => {
    const msg = faker.lorem.words(3);
    const str = `[FORTUNES RUNNER] is publishing message, ${msg} at ${new Date()}`;
    console.log(str)
    publisher.publish(msg);
},1000);

