const amqp = require('amqp-connection-manager');
const {validateDependencies, getBrokerUrl} = require('../dependencies');


class Publisher {
    constructor(topic) {
        validateDependencies();

        this.topic = topic;
        this.url = getBrokerUrl();


        const EXCHANGE_NAME = this.topic;

        // Create a connection manager
        const connection = amqp.connect([this.url]);
        connection.on('connect', () => console.log('Connected!'));
        connection.on('disconnect', err => console.log('Disconnected.', err.stack));

        // Create a channel wrapper
        const channelWrapper = connection.createChannel({
            json: true,
            setup: channel => channel.assertExchange(EXCHANGE_NAME, 'topic')
        });

        // Send messages until someone hits CTRL-C or something goes wrong...
        this.sendMessage = (message) => {
            channelWrapper.publish(EXCHANGE_NAME, JSON.stringify(message), {time: Date.now()}, {
                contentType: 'application/json',
                persistent: true
            })
                .then((result) => {
                    console.log({result});
                    return result;
                })
                .catch(err => {
                    console.log("Message was rejected:", err.stack);
                    channelWrapper.close();
                    connection.close();
                });
        };

    };

   publish (message) {
        this.sendMessage(message);
    }
}

module.exports = {
    Publisher: Publisher
};