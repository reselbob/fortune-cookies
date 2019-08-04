const validateDependencyApiUrls = () =>{
    const missingTargets = [];

    if(!process.env.SCHEDULER_API_URL) missingTargets.push('SCHEDULER_API_URL');
    if(missingTargets.length > 0){
        const str =  `The following required environment variable are missing: ${JSON.stringify(missingTargets)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }

    //TODO: Ping every URL to make sure it's active
};
const getDependencyApiUrl = (TARGET_ENUM) => {
    switch (TARGET_ENUM) {
        case 'SCHEDULER_API_URL':
            return process.env.SCHEDULER_API_URL;
            break;
    }
};

const getSchedulerApiUrl = ()=>{
    return getDependencyApiUrl('SCHEDULER_API_URL');
};


module.exports = {validateDependencyApiUrls, getDependencyApiUrl,getSchedulerApiUrl};