const {Sequelize} = require('sequelize');
const {config} = require('./config');
const sequelize = new Sequelize(config);

const ping = async () => {
    let msg = {};
    try {
        await sequelize.authenticate();
        const str = `Connection to ${config} established at ${new Date()}`;
        console.log(str);
        msg =  {status: 'OK', message: str};
    } catch (error) {
        const str = `Unable to connected to ${config} established at ${new Date()}`;
        console.error('Unable to connect to the database:', error);
        msg =  {status: 'ERROR', message: str};
    }
    return msg;
}
module.exports = {ping};
