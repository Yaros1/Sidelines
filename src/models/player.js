const sequelize = require('../db');
const { Model, DataTypes, Sequelize } = require('sequelize');

class Player extends Model {}
Player.init(
  {
    playerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    team: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    position: DataTypes.STRING,
    upcomingDraftKingsSalary: DataTypes.DECIMAL,
    updateDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, Model: 'Player', timestamps: false },
);

module.exports = Player;
