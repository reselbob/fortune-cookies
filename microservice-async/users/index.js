/*

supported incoming message
{
    action: [CREATE, UPDATE, DELETE]
    id: uuid, <optional>
    firstName: string
    lastName: string
    dob: Date,
    phone: string
    email: string
    target: string
    interval: string <optional>
}


supported outgoing message format
{
    action: [CREATE, UPDATE, DELETE]
    id: uuid
    firstName: string
    lastName: string
    dob: Date,
    phone: string
    email: string
    target: string
    interval: string [optional]
    sendDate: Date
}
 */

const {validateEnvVars, getDependencyEnvVar, Publisher, Subscriber} = require('./messageBroker');
const {getUsers, addUser, getUsersSync, getUser, deleteUser, updateUser} = require('./dataManager');

validateEnvVars();

const getInitMessage = (service, id) =>{
    return `${service} ${id} started running at ${new Date()}`;
};

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
};


const validateUserMessage = (message)=>{
    const requiredProps = ['action','firstName', 'lastName', 'dob', 'email', 'phone','target'];
    const missingProps = [];
    requiredProps.forEach(prop =>{
        if(!message[prop]) missingProps.push(prop);
    });

    if(missingEnvVars.length > 0){
        const str =  `Missing Property Error: The following required properties are missing: ${JSON.stringify(missingProps)} in the User service.`;
        throw new Error(str);
    }

    //check for ID on an update or delete
    if(message.action.toUpperCase() === 'UPDATE' && !message.id){
        const str = `You have an action ${message.action} without the required unique identifier, id`;
        throw new Error(str);
    }

    if(message.action.toUpperCase() === 'DELETE' && !message.id){
        const str = `You have an action ${message.action} without the required unique identifier, id`;
        throw new Error(str);}

};

const onUserMessageReceived = async (channel, message) => {
    let obj = createStatusObject('USERS', 'onUserMessageReceived', 'RECEIVED', message, channel);
    console.log(JSON.stringify(obj));

    try {
        validateUserMessage(message)
    } catch (e) {
        console.log(e.message);
        return;
    }

    //get the action
    let result;
    switch(message.action.toUpperCase()){
        case 'CREATE':
            result = await addUser(message);
            break;
        case 'UPDATE':
            result = await updateUser(message);
            break;
        case 'DELETE':
            result = await deleteUser(message.id);
            break

    }
    await publisher.publish(result);

    obj = createStatusObject('USERS', 'onUserMessageReceived', 'PUBLISHED', result, null, getDependencyEnvVar('SENDER_TARGET_TOPIC'));
    obj.result = result;
    console.log(JSON.stringify(obj));
};


const publisher = new Publisher(getDependencyEnvVar('USERS_TARGET_TOPIC'));
console.log(getInitMessage('USERS publisher', publisher.id));

const subscriber = new Subscriber(getDependencyEnvVar('USERS_SOURCE_TOPIC'), onUserMessageReceived);
console.log(getInitMessage('USERS subscriber', subscriber.id));

