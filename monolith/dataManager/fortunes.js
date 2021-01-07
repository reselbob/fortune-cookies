const { Sequelize, Model, DataTypes } = require('sequelize');
const {config } = require('./config');
const sequelize = new Sequelize(config);


class Fortune extends Model {}
Fortune.init({
    // Model attributes are defined here
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
    sequelize, // We need to pass the connection instance
    modelName: 'Fortune' // We need to choose the model name
});

// the defined model is the class itself
console.log(Fortune === sequelize.models.Fortune); // true

module.exports = {Fortune}


