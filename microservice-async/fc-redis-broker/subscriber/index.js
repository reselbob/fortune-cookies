const redis = require("redis");
const {promisify} = require('util');
const uuidv4 = require('uuid/v4');

const {getDependencyEnvVar,validateDependencies} = require('../dependencies');

const validateConstructorParams = (channel, onMessageFunction) => {
    const arr = [];
    if(!channel) arr.push('channel');
    if(!onMessageFunction) arr.push('onMessageFunction');

    if(arr.length > 0) throw new Error(`The following required constructor parameters are missing values: ${JSON.stringify(arr)}`);
};

class Subscriber {
    constructor(channel, onMessageFunction) {
        validateDependencies();
        validateConstructorParams(channel, onMessageFunction);
        const id = uuidv4();
        this.id = id;

        const options = {
            host: getDependencyEnvVar('REDIS_ENDPOINT'),
            port: getDependencyEnvVar('REDIS_PORT'),
            password: getDependencyEnvVar('REDIS_PWD')
        };
        const client =  redis.createClient(options);
        this.client = client;

        client.on('ready', function () {
            console.log(`Subscriber ${id} READY at ${new Date()}`);

            client.subscribe(channel);
            console.log(`Subscriber ${id} SUBSCRIBING to Channel ${channel} at ${new Date()}`);
        });

        client.on('subscribe', function (channel, count) {
            console.log(`Subscriber ${id} SUBSCRIBED to Channel ${channel} at ${new Date()}`)
        });

        client.on('unsubscribe', function (channel, count) {
            console.log(`Subscriber ${id} UNSUBSCRIBED from ${channel} at ${new Date()}`)
        });

        client.on('message', onMessageFunction);
    }

    async unsubscribe (){
        const usub = promisify(this.client.unsubscribe).bind(this.client);
        return await usub();
    }
    async close (){
        const end = promisify(this.client.end).bind(this.client);
        await end(true);
        console.log(`Subscriber ${id} CLOSED at ${new Date()}`)
    }
}

module.exports = {
    Subscriber: Subscriber
};