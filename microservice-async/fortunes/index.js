const {validateEnvVars, getDependencyEnvVar, Publisher, Subscriber} = require('./messageBroker');
const {getRandomFortune} = require('./dataManager');


/*

output message format

{
    fortune:string
    sendDate: Date
    source: FORTUNES
}

 */

validateEnvVars();

const onMessageReceived = async (channel, message) => {
    console.log(`[RECEIVED MESSAGE], ${message}  from channel, ${channel} at ${new Date()}`);
    const fortune = await getRandomFortune();
    const msg = JSON.stringify({fortune, sendDate: new Date(), source: 'FORTUNES'});
    console.log(`[SENDING FORTUNE], ${msg}  from channel, ${channel} to ${targetChannel} at ${new Date()}`);
    await publisher.publish(msg)
    console.log(`[SENT FORTUNE], ${msg}  from channel, ${channel} at ${new Date()}`);
}

const sourceChannel = getDependencyEnvVar('FORTUNES_SOURCE_TOPIC');
const targetChannel = getDependencyEnvVar('FORTUNES_TARGET_TOPIC');

const subscriber = new Subscriber(sourceChannel, onMessageReceived);
const publisher = new Publisher(targetChannel);