const {SentFortune} = require('./sentFortune');
const {ping} = require('./pinger');

const getSentFortune = async (id) => {
    await SentFortune.sync();
    return await SentFortune.findAll({
        where: {
            id: id
        }
    });
}

const saveSentFortune = async (sentFortune) => {
    await SentFortune.sync();
    console.log(`Writing sentFortune ${sentFortune} at ${new Date()}`);
    const sf = await SentFortune.create({
        firstName: sentFortune.firstName,
        lastName: sentFortune.lastName,
        fortune: sentFortune.fortune
    }, {fields: ['firstName', 'lastName', 'fortune']});
    console.log(`Wrote sentFortune ${sentFortune} at ${new Date()} with SentFortune ID ${sf.id}`);

    return sf;
}

const getSentFortunes = async (limit) => {
    const lmt = limit || 10;
    await SentFortune.sync();
    const sentFortunes = await SentFortune.findAll(lmt);
    return sentFortunes;
};

const touch = async () => {
    return await ping();
}


module.exports = {
    touch,
    saveSentFortune,
    getSentFortunes,
    getSentFortune
}
