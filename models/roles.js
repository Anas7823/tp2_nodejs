const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const roles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nom: {
        type: DataTypes.ENUM('admin', 'conducteur', 'pigeon', 'hater', 'nouveau'),
        allowNull: false,
        defaultValue: 'nouveau'
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_marque: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    freezeTableName: true
});


module.exports = roles;