const URL = require("url").URL;

const stringIsAValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

const validateTargets = () =>{
    let arr = [];

    if(!process.env.TWITTER_API_URL) arr.push('TWITTER_API_URL');
    if(!process.env.FACEBOOK_API_URL) arr.push('FACEBOOK_API_URL');
    if(!process.env.LINKEDIN_API_URL) arr.push('LINKEDIN_API_URL');
    if(!process.env.INSTAGRAM_API_URL) arr.push('INSTAGRAM_API_URL');
    if(!process.env.SMS_API_URL) arr.push('SMS_API_URL');
    if(!process.env.EMAIL_API_URL) arr.push('EMAIL_API_URL');

    if(arr.length > 0){
        const str =  `The following required environment variable are missing: ${JSON.stringify(arr)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }

    arr = [];

    if(!stringIsAValidUrl(process.env.TWITTER_API_URL)) arr.push('TWITTER_API_URL');
    if(!stringIsAValidUrl(process.env.FACEBOOK_API_URL)) arr.push('FACEBOOK_API_URL');
    if(!stringIsAValidUrl(process.env.LINKEDIN_API_URL)) arr.push('LINKEDIN_API_URL');
    if(!stringIsAValidUrl(process.env.INSTAGRAM_API_URL)) arr.push('INSTAGRAM_API_URL');
    if(!stringIsAValidUrl(process.env.SMS_API_URL)) arr.push('SMS_API_URL');
    if(!stringIsAValidUrl(process.env.EMAIL_API_URL)) arr.push('EMAIL_API_URL');

    if(arr.length > 0){
        const str =  `The following required target URLs are not formatted property: ${JSON.stringify(arr)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }
    const targets = getTargets();
    targets.forEach(function(target) {
        console.log(`${target}'s url is ${getTargetApiUrl(target)}`);
    });
};

const getTargets = ()=> {
    return ['TWITTER','FACEBOOK', 'LINKEDIN','INSTAGRAM','SMS','EMAIL','FORTUNES'];
};

const getTargetApiUrl = (TARGET_ENUM) => {
    switch (TARGET_ENUM) {
        case 'TWITTER':
            return process.env.TWITTER_API_URL;
        case 'FACEBOOK':
            return process.env.FACEBOOK_API_URL;
        case 'LINKEDIN':
            return process.env.LINKEDIN_API_URL;
        case 'INSTAGRAM':
            return process.env.INSTAGRAM_API_URL;
        case 'SMS':
            return process.env.SMS_API_URL;
        case 'EMAIL':
            return process.env.EMAIL_API_URL;
        case 'FORTUNES':
            return process.env.FORTUNES_API_URL;
    }
};

module.exports = {validateTargets,getTargetApiUrl,getTargets};


