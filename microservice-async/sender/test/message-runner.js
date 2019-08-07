const faker = require('faker');
const util = require('util');
const setIntervalPromise = util.promisify(setInterval);

const {topics,Publisher} = require('../messageBroker');

const publisher = new Publisher(topics.SOURCE_TOPIC);

setIntervalPromise(() => {
    const msg = faker.lorem.words(3);
    const str = `[RUNNER] is publishing message, ${msg} at ${new Date()}`;
    console.log(str)
    publisher.publish(msg);
},1000);

