const { Sequelize, Model, DataTypes } = require('sequelize');
const {config } = require('./config');
const sequelize = new Sequelize(config);

const SentFortune = sequelize.define('SentFortune', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fortune: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

console.log(`SentFortune initialized: ${SentFortune === sequelize.models.SentFortune} at ${new Date()}`);
module.exports = {SentFortune}
