//Use the ORM that's encapsulated in the DataManager
const {saveSentFortune} = require('../dataManager');

/*
Writes the send console and the data source
 */
const send = async (config, fortune) => {
    // This is the code that was in force before strangling started
    console.log(`Greetings from ${config.firstName} ${config.lastName}: ${fortune}`);
    //

    // This is the strangling code. Notice that it's using the saveSentFortune method
    // from the DataManager. The DataManager encapsulates ORM technology that controls
    ///writing the the MariaDB data source.
    const data = {
        firstName: config.firstName,
        lastName: config.lastName,
        fortune
    }
    console.log(`Writing SentFortune ${data} to datasource at ${new Date()}`);
    const result = await saveSentFortune(data)
    console.log(`Wrote SentFortune ${data} to datasource at ${new Date()}`);
    //
};
module.exports = {send};
