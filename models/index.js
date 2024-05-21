// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection re-synced");
  })
  .catch((err) => {
    console.log("Error on re-synced", err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require("../models/users/user")(db.sequelize, DataTypes);
db.product = require("../models/product/product")(db.sequelize, DataTypes);
db.inventory = require("../models/inventory/inventory")(db.sequelize, DataTypes);
db.order = require("../models/order/order")(db.sequelize, DataTypes);
db.orderItem = require("../models/orderItem/orderItem")(db.sequelize, DataTypes);


product.hasMany(inventory, { foreignKey: 'productId' });
inventory.belongsTo(product, { foreignKey: 'productId' });

Order.hasMany(orderItem, { foreignKey: 'orderId' });
orderItem.belongsTo(Order, { foreignKey: 'orderId' });

product.hasMany(orderItem, { foreignKey: 'productId' });
orderItem.belongsTo(product, { foreignKey: 'productId' });

module.exports = db;
