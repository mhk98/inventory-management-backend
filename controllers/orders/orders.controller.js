const { createOrder } = require('../services/orderService');

const placeOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = await createOrder(userId, items);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};

module.exports = { placeOrder };
