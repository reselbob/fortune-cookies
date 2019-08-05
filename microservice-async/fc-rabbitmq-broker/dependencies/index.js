const validateDependencies = () => {
    const missingTargets = [];

    if(!process.env.FC_MESSAGE_BROKER_URL) missingTargets.push('FC_MESSAGE_BROKER_URL');


    if(missingTargets.length > 0){
        const str =  `The following required environment variable are missing: ${JSON.stringify(missingTargets)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }
};

const getMessageBrokerUrl = () => {
    return process.env.FC_MESSAGE_BROKER_URL;
};

module.exports = {validateDependencies,getMessageBrokerUrl};

