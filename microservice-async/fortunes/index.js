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

const sourceChannel = getDependencyEnvVar('FORTUNES_SOURCE_TOPIC');
const targetChannel = getDependencyEnvVar('FORTUNES_TARGET_TOPIC');

const onMessageReceived = async (channel, message) => {
    console.log(`[RECEIVED MESSAGE], ${message}  from channel, ${channel} at ${new Date()}`);
    const fortune = await getRandomFortune();
    const msg = JSON.stringify({fortune, sendDate: new Date(), source: 'FORTUNES'});
    console.log(`[SENDING FORTUNE], ${msg}  from channel, ${channel} to ${targetChannel} at ${new Date()}`);
    await publisher.publish(msg);
    console.log(`[SENT FORTUNE], ${msg}  from channel, ${channel} to ${targetChannel} at ${new Date()}`);
};



const subscriber = new Subscriber(sourceChannel, onMessageReceived);
const publisher = new Publisher(targetChannel);

const getInitMessage = (service, id, channel) =>{
    return `${service} ${id} is attached to channel,[${channel}] at ${new Date()} in FORTUNES`;
};

console.log(getInitMessage('Subscriber', subscriber.id, sourceChannel));
console.log(getInitMessage('Publisher', publisher.id, targetChannel));