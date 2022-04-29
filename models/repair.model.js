const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Repair = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  computerNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = { Repair };
