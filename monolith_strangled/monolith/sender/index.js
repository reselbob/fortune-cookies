//Use the ORM that's encapsulated in the DataManager
const {saveSentFortune} = require('../dataManager');


/*
Writes the send console and the datasource
 */
const send = async (config, fortune) => {
    console.log(`Greetings from ${config.firstName} ${config.lastName}: ${fortune}`);
    const data = {
        firstName: config.firstName,
        lastName: config.lastName,
        fortune
    }
    console.log(`Writing SentFortune ${data} to datasource at ${new Date()}`);
    const result = await saveSentFortune(data)
    console.log(`Wrote SentFortune ${data} to datasource at ${new Date()}`);

};
module.exports = {send};
