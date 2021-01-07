const {Fortune} = require('./fortunes');
const {User} = require('./users');
const {ping} = require('./pinger');

const saveFortune = async (fortune) => {
    await Fortune.sync();
    console.log(`Writing fortune ${fortune} at ${new Date()}`);
    const f = Fortune.build({fortune});
    await f.save();
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
    }, { fields: ['firstName','lastName','phone','email','dob', 'interval'] });
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

module.exports =  {saveFortune, getFortunes, saveUser, getUser, getUsers, touch}
