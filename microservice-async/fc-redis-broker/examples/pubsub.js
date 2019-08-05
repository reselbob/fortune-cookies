'use strict';
const redis = require('redis');
const faker = require('faker');
const {getDependencyEnvVar,validateDependencies} = require('../dependencies');


const options = {
    host: getDependencyEnvVar('REDIS_ENDPOINT'),
    port: getDependencyEnvVar('REDIS_PORT'),
    password: getDependencyEnvVar('REDIS_PWD')
};

const topic = 'reselbobTopic01';
const client1 = redis.createClient(options);
let msg_count = 0;
const client2 = redis.createClient(options);

const util = require('util');
const setIntervalPromise = util.promisify(setInterval);



// Most clients probably don't do much on 'subscribe'. This example uses it to coordinate things within one program.
client1.on('subscribe', function (channel, count) {
    setIntervalPromise(() => {
        const str = faker.lorem.words(3);
        client2.publish(topic, str);
    },1000);
});

client1.on('unsubscribe', function (channel, count) {
    console.log('client1 unsubscribed from ' + channel + ', ' + count + ' total subscriptions');
});

client1.on('message', function (channel, message) {
    console.log('this is a message from client1 channel ' + channel + ': ' + message);
});

client1.on('ready', function () {
    client1.incr('did a thing');
    client1.subscribe(topic);
});

client2.on('ready', function () {
   console.log('ready!')
});