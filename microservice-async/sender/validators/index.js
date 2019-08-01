const validateSenderMessage = (message) => {
    const setString = (properties) => {
        return `The following required properties ${JSON.stringify(properties)} are missing in message`;
    }
    const arr = [];
    if(!message.topic) arr.push('topic');
    if(!message.payload) arr.push('payload');

    if(arr.length > 0) throw new Error(setString(arr));
};l

module.exports = {validateSenderMessage};