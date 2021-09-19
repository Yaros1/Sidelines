const { Sequelize } = require('sequelize');
const { SQLCONNECTIONSTRING } = require('./config');
const sequelize = new Sequelize(SQLCONNECTIONSTRING);

module.exports = sequelize;
