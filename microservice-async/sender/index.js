const {validateEnvVars, getDependencyEnvVar, Publisher, Subscriber} = require('./messageBroker');
validateEnvVars();
/*
supported message format
{
    target: string
    payload: object
    sendDate: Date
}
 */

const createStatusObject = (service,handler,mode,message, from, to) =>{
    const obj = {
        service,
        handler,
        mode,
        message,
        from,
        to,
        createdOn: new Date()
    }

    return obj;
}

const onSenderMessageReceived = async (channel, message) => {
    let obj = createStatusObject('SENDER','onSenderMessageReceived','RECEIVED',message, channel);
    console.log(JSON.stringify(obj));

    //send a message to FORTUNES source, which will in turn, send the message onto the SENDER TARGET
    obj = createStatusObject('SENDER','onSenderMessageReceived','PUBLISHING',message, null,getDependencyEnvVar('FORTUNES_SOURCE_TOPIC'));
    console.log(JSON.stringify(obj));
    console.log(`Publisher ${fortunesPublisher.id } is PUBLISHING message, ${JSON.stringify(message)} at ${new Date()}`);

    const rslt = fortunesPublisher.publish(message);

    obj = createStatusObject('SENDER','onSenderMessageReceived','PUBLISHED',message, null,getDependencyEnvVar('FORTUNES_SOURCE_TOPIC'));
    obj.result = rslt;

    console.log(JSON.stringify(obj));
};


//----- fortunes

const onFortunesMessageReceived = async (channel, message) => {
    let obj = createStatusObject('SENDER', 'onFortunesMessageReceived', 'RECEIVED', message, channel);
    console.log(JSON.stringify(obj));

    const rslt = await senderPublisher.publish(message);

    obj = createStatusObject('SENDER', 'onFortunesMessageReceived', 'PUBLISHED', message, null, getDependencyEnvVar('SENDER_TARGET_TOPIC'));
    obj.rslt = rslt;
    console.log(JSON.stringify(obj));
};

const getInitMessage = (service, id) =>{
    return `${service} ${id} started running at ${new Date()}`;
};

const senderPublisher = new Publisher(getDependencyEnvVar('SENDER_SOURCE_TOPIC'));
const senderSubscriber = new Subscriber(getDependencyEnvVar('SENDER_TARGET_TOPIC'), onSenderMessageReceived);

console.log(getInitMessage('senderPublisher', senderPublisher.id));
console.log(getInitMessage('senderSubscriber', senderSubscriber.id));

const fortunesPublisher = new Publisher(getDependencyEnvVar('FORTUNES_SOURCE_TOPIC'));
const fortunesSubscriber = new Subscriber(getDependencyEnvVar('FORTUNES_TARGET_TOPIC'), onFortunesMessageReceived);

console.log(getInitMessage('fortunesPublisher', fortunesPublisher.id));
console.log(getInitMessage('fortunesSubscriber', fortunesSubscriber.id));