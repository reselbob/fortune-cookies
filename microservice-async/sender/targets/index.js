const {Publisher} = require('fc-message-broker');
const publisher = new Publisher();

const validateTopics = () => {
    const missingTopics = [];

    if (!process.env.TWITTER_TOPIC) missingTopics.push('TWITTER_TOPIC');
    if (!process.env.FACEBOOK_TOPIC) missingTopics.push('FACEBOOK_TOPIC');
    if (!process.env.LINKEDIN_TOPIC) missingTopics.push('LINKEDIN_TOPIC');
    if (!process.env.INSTAGRAM_TOPIC) missingTopics.push('INSTAGRAM_TOPIC');
    if (!process.env.SMS_TOPIC) missingTopics.push('SMS_TOPIC');
    if (!process.env.EMAIL_TOPIC) missingTopics.push('EMAIL_TOPIC');

    if (missingTopics.length > 0) {
        const str = `The following required environment variable are missing: ${JSON.stringify(missingTopics)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }
};

const topics = {
    TWITTER_TOPIC: process.env.TWITTER_TOPIC,
    FACEBOOK_TOPIC: process.env.FACEBOOK_TOPIC,
    LINKEDIN_TOPIC: process.env.LINKEDIN_TOPIC,
    INSTAGRAM_TOPIC: process.env.INSTAGRAM_TOPIC,
    SMS_TOPIC: process.env.SMS_TOPIC,
    EMAIL_TOPIC: process.env.EMAIL_TOPIC,
};


const sendToTopic = async (topic, message) => {
    return await publisher.send(topic, message)
}
module.exports = {validateTopics, topics, sendToTopic};