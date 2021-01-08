const { Sequelize, Model, DataTypes } = require('sequelize');
const {config } = require('./config');
const sequelize = new Sequelize(config);

const Fortune = sequelize.define('Fortune', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    fortune: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

console.log(`Fortune initialized: ${Fortune === sequelize.models.Fortune} at ${new Date()}`);
module.exports = {Fortune}


