const {Fortune} = require('./fortunes');
const {User} = require('./users');

const saveFortune = async (fortune) => {
    console.log(`Writing fortune ${fortune} at ${new Date()}`);
    const f = await Fortune.create({
        fortune: fortune,
    }, { fields: ['fortune'] });
// let's assume the default of isAdmin is false
    console.log(`Wrote fortune ${fortune} at ${new Date()} with Fortune ID ${f.id}`);
}
const getFortunes = async () => {
    const fortunes = await Fortune.findAll();
    return fortunes;
}
const saveUser = async (user) => {
    console.log(`Writing user ${user} at ${new Date()}`);
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
}
const getUser = async (id) => {
    User.findAll({
        where: {
            id: id
        }
    });
}
const getUsers = async () => {
    const users = await User.findAll();
    return users;
}

module.exports =  {saveFortune, getFortunes, saveUser, getUser, getUsers}
