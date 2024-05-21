const { sequelize, Order, OrderItem, Inventory } = require('../models');

const createOrder = async (userId, items) => {
  const transaction = await sequelize.transaction();

  try {
    const order = await Order.create({
      user_id: userId,
      status: 'pending',
      total_amount: 0, // Calculated later
    }, { transaction });

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) throw new Error(`Product with id ${item.productId} not found`);

      const inventory = await Inventory.findOne({
        where: { product_id: item.productId },
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (!inventory || inventory.quantity < item.quantity) {
        throw new Error(`Insufficient inventory for product ${product.name}`);
      }

      await OrderItem.create({
        order_id: order.order_id,
        product_id: item.productId,
        quantity: item.quantity,
        price: product.price,
      }, { transaction });

      await Inventory.update(
        { quantity: inventory.quantity - item.quantity },
        { where: { product_id: item.productId }, transaction }
      );

      totalAmount += product.price * item.quantity;
    }

    await Order.update(
      { total_amount: totalAmount, status: 'confirmed' },
      { where: { order_id: order.order_id }, transaction }
    );

    await transaction.commit();
    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = { createOrder };
