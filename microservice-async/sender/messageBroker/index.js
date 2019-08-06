const {Publisher, Subscriber} = require('../../fc-redis-broker');

const validateTopics = () => {
    const missingTopics = [];

    if (!process.env.SENDER_TARGET_TOPIC) missingTopics.push('SENDER_TARGET_TOPIC');
    if (!process.env.SENDER_SOURCE_TOPIC) missingTopics.push('SENDER_SOURCE_TOPIC');

    if (missingTopics.length > 0) {
        const str = `The following required environment variable are missing: ${JSON.stringify(missingTopics)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }
};

const topics = {
    SOURCE_TOPIC: process.env['SENDER_SOURCE_TOPIC'],
    TARGET_TOPIC: process.env['SENDER_TARGET_TOPIC']
};


module.exports = {validateTopics, topics, Publisher, Subscriber};