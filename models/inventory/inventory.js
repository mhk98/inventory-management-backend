const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Inventory = sequelize.define('Inventory', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Inventory;
