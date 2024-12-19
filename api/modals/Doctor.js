// models/Doctor.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');
const User = require('./User'); // Import the User model

// Doctor model definition
const Doctor = sequelize.define('Doctor', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',  // Refers to the 'Users' table
            key: 'id',
        },
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qualifications: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fees: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profilePicture: {
        type: DataTypes.STRING,  // Store the file path of the uploaded image
        allowNull: true,
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationToken: {
        type: DataTypes.STRING,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Define associations
Doctor.belongsTo(User, { foreignKey: 'userId' }); // Associate Doctor to User
User.hasOne(Doctor, { foreignKey: 'userId' }); // One user has one doctor

// Import Availability and TimeSlot models after defining Doctor model
const Availability = require('./Availability');

// Define associations for Availability
Doctor.hasMany(Availability, { foreignKey: 'doctorId' });

module.exports = Doctor;
