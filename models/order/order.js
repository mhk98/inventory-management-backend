const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const order = sequelize.define('order', {
  order_id: { 
    type: DataTypes.INTEGER,
     primaryKey: true, 
     autoIncrement: true 
    },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = order;
