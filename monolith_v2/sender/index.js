const { saveSentFortune } = require('../dataManager');
const send = async (config, fortune) =>{
    const sentFortune = {
        firstName: config.firstName,
        lastName: config.lastName,
        fortune
    }
    console.log(`Greetings from ${config.firstName} ${config.lastName}: ${fortune}`);
    await saveSentFortune(sentFortune);
};
module.exports = {send};
