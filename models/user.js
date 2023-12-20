const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_super_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    newUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize,
    freezeTableName: true
});


module.exports = user;