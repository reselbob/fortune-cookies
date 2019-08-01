/*
See https://github.com/benbria/node-amqp-connection-manager for details of the using the amqp
package to access the the RabbitMQ message broker
 */

const amqp = require('amqp-connection-manager');
const {validateDependencies, getBrokerUrl} = require('../dependencies');

function validateContructorParams(topic, queue) {
    const arr = [];
    if (!topic) arr.push('topic');
    if (!queue) arr.push('queue');
    if (arr.length > 0) throw new Error(`The following required parameters the Subscriber contructure are missing values: ${JSON.stringify(arr)}`);
}

/*
    onMessageFunction needs to support two properties in the
    parameter object.
    data: the data coming in from the given queue
    channelWrapper: a channel that will be passed into the function
                    caller internal to the class but needs to call the
                    ack method

    Here is an example of the function:

    const onMessageFunction = (data, channelWrapper) => {
            const message = JSON.parse(data.content.toString());
            console.log("subscriber: got message", message);
            channelWrapper.ack(data);
    }


 */
class Subscriber {
    constructor(topic, queue, onMessageFunction) {
        validateDependencies();
        validateContructorParams(topic, queue);

        this.topic = topic;
        this.queue = queue;
        this.url = getBrokerUrl();

        const QUEUE_NAME = this.queue;
        const EXCHANGE_NAME = this.topic;

        // Handle an incoming message.
        const onMessage = onMessageFunction;

        // Create a connection manager
        const connection = amqp.connect([this.url]);
        connection.on('connect', () => console.log('Connected!'));
        connection.on('disconnect', err => {
            console.log('Disconnected.', err.stack)
        });

        // Set up a channel listening for messages in the queue.
        const channelWrapper = connection.createChannel({
            setup: channel =>
                // `channel` here is a regular amqplib `ConfirmChannel`.
                Promise.all([
                    channel.assertQueue(QUEUE_NAME, { exclusive: true, autoDelete: true }),
                    channel.assertExchange(EXCHANGE_NAME, 'topic'),
                    channel.prefetch(1),
                    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, '#'),
                    channel.consume(QUEUE_NAME, onMessage)
                ])
        });

        channelWrapper.waitForConnect()
            .then(function() {
                console.log(`Listening for messages`);
            });

    }
}

module.exports = {
    Subscriber: Subscriber
};