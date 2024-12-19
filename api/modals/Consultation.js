const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');
const User = require('./User'); // Make sure the path is correct
const Doctor = require('./Doctor'); // If applicable

const Consultation = sequelize.define('Consultation', {
    patientId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', 
            key: 'id',
        },
    },
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Doctors', 
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('Pending','Accepted','Rejected', 'Completed'),
        defaultValue: 'Pending',
    },
    imagePath: {
        type: DataTypes.STRING,
    },
    timeSlot: {
        type: DataTypes.STRING,
       
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    patientname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    

});


Consultation.belongsTo(User, {
    foreignKey: 'patientId',
    targetKey: 'id',
});
Consultation.belongsTo(Doctor, {
    foreignKey : 'doctorId',
    targetKey: 'id',
});


module.exports = Consultation;
