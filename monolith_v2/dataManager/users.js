const { Sequelize, Model, DataTypes } = require('sequelize');
const {config } = require('./config');
const sequelize = new Sequelize(config);

const User = sequelize.define('User', {
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
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    period: {
        type: DataTypes.STRING,
        defaultValue: "* * * * * *"
    }
}, {
    // Other model options go here
});

console.log(`User initialized: ${User === sequelize.models.User} at ${new Date()}`);

module.exports = {User}
