const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const marque = sequelize.define('marque', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    freezeTableName: true
});


module.exports = marque;