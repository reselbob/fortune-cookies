const redis = require("redis");
const {promisify} = require('util');
const uuidv4 = require('uuid/v4');


const {getDependencyEnvVar,validateDependencies} = require('../dependencies');

class Publisher {
    constructor(channel) {
        validateDependencies();
        if(!channel) throw new Error('No channel defined. It\'s required. So declare one!');
        const options = {
            host: getDependencyEnvVar('REDIS_ENDPOINT'),
            port: getDependencyEnvVar('REDIS_PORT'),
            password: getDependencyEnvVar('REDIS_PWD')
        };
        this.channel = channel;
        this.client =  redis.createClient(options);
        const id = uuidv4();
        this.id = id;

        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
    };

    async publish (message) {
        const pub = promisify(this.client.publish).bind(this.client);
        const response = await pub(this.channel, message);
        console.log(`Publisher ${this.id} published a message, ${message} to channel ${this.channel} at ${new Date()} with response ${JSON.stringify(response)}`);
        return {response};
    };

    async ping () {
        const ping = promisify(this.client.ping).bind(this.client);
        const response = await ping();
        console.log(response);
        return {response};
    };


    async close () {
        const end = promisify(this.client.end).bind(this.client);
        await end(true);
        console.log(`Publisher ${id} CLOSED at ${new Date()}`)
    }

}
module.exports = {
    Publisher: Publisher
};