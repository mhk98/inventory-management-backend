const { createOrder } = require('./orderService');
const { processPayment } = require('./paymentService');
const { initiateShipping } = require('./shippingService');

const placeOrderSaga = async (userId, items) => {
  const order = await createOrder(userId, items);

  try {
    await processPayment(order);
    await initiateShipping(order);
    // Mark order as completed
    await order.update({ status: 'completed' });
  } catch (error) {
    // Compensating transactions
    await order.update({ status: 'failed' });
    throw error;
  }

  return order;
};

module.exports = { placeOrderSaga };
