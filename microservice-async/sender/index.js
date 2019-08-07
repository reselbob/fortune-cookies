const {topics, Publisher, Subscriber} = require('./messageBroker');

/*
supported message format
{
    target: string
    payload: object
    sendDate: Date
}
 */

const publisher = new Publisher(topics.TARGET_TOPIC);

const onMessageReceived = async (channel, message) => {
    const msg = JSON.stringify(message);
    console.log(`[RECEIVED MESSAGE], ${msg} at ${new Date()}`);

    console.log(`Publisher ${publisher.id } is PUBLISHING message, ${msg} at ${new Date()}`);
    let result = await publisher.publish(message);

    console.log(`Publisher ${publisher.id } PUBLISHED  message, ${msg} at ${new Date()}`);
}

const subscriber = new Subscriber(topics.SOURCE_TOPIC, onMessageReceived);