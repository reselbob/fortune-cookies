const { Sequelize, Model, DataTypes } = require('sequelize');
const {config } = require('./config');
const sequelize = new Sequelize(config);


class User extends Model {}
User.init({
    // Model attributes are defined here
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
    interval: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    created: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.NOW
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = {User}
