const { DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');


const Message = sequelize.define('Message', {
  sender_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Message;
