const {Fortune} = require('./fortunes');
const {User} = require('./users');
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

const getSentFortunes = async () => {
    await SentFortune.sync();
    const sentFortunes = await SentFortune.findAll();
    return sentFortunes;
};

const saveFortune = async (fortune) => {
    await Fortune.sync();
    console.log(`Writing fortune ${fortune} at ${new Date()}`);
    const f = await Fortune.create({
        fortune
    }, {fields: ['fortune']});
    console.log(`Wrote fortune ${fortune} at ${new Date()} with Fortune ID ${f.id}`);

    return f;
}
const getFortunes = async () => {
    await Fortune.sync();
    const fortunes = await Fortune.findAll();
    return fortunes;
}
const saveUser = async (user) => {
    console.log(`Writing user ${user} at ${new Date()}`);
    await User.sync();
    const u = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        dob: user.dob,
        interval: user.interval
    }, {fields: ['firstName', 'lastName', 'phone', 'email', 'dob', 'interval']});
// let's assume the default of isAdmin is false
    console.log(`Wrote user ${user} at ${new Date()} with User ID ${u.id}`);

    return u;
}
const getUser = async (id) => {
    await User.sync();
    return await User.findAll({
        where: {
            id: id
        }
    });
}
const getUsers = async () => {
    await User.sync();
    const users = await User.findAll();
    return users;
}

const touch = async () => {
    return await ping();
}

const fortunesExist = async () => {
    let result = true;
    try {
        const users = await getFortunes();
        if (!users || users.length === 0) result = false;
    } catch (e) {
        result = false;
    }
    return result;
}

const usersExist = async () => {
    let result = true;
    try {
        const users = await getUsers();
        if (!users || users.length === 0) result = false;
    } catch (e) {
        result = false;
    }
    return result;
}
module.exports = {
    saveFortune,
    getFortunes,
    saveUser,
    getUser,
    getUsers,
    touch,
    saveSentFortune,
    getSentFortunes,
    getSentFortune,
    fortunesExist,
    usersExist
}
