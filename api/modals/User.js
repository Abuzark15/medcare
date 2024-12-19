const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      gender: {
        type: DataTypes.ENUM('male','female'),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('patient','doctor','admin'),
        defaultValue: 'patient',
      },
      isDoctorRequested: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDoctorApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
});


module.exports = User;
