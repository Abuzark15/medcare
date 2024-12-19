const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('healthcare2', 'root', 'smart@2099', {
    host: 'localhost',
    dialect:'mysql'
  });


module.exports = sequelize;