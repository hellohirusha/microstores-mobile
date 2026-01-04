const express = require('express');
const { getStoresByOwner } = require('../models/storeModel');
const { getOrdersByStore, updateOrderStatus } = require('../models/orderModel');

const router = express.Router();

// GET stores for a seller
router.get('/stores/:ownerId', (req, res) => {
  const ownerId = req.params.ownerId;
  getStoresByOwner(ownerId, (err, stores) => {
    if (err) return res.status(500).json({ error: err });
    res.json(stores);
  });
});

// GET all orders for a store
router.get('/stores/:storeId/orders', (req, res) => {
  const storeId = req.params.storeId;
  getOrdersByStore(storeId, (err, orders) => {
    if (err) return res.status(500).json({ error: err });
    res.json(orders);
  });
});

// PUT update order status
router.put('/orders/:orderId/status', (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body; // e.g., 'shipped', 'delivered'

  updateOrderStatus(orderId, status, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Order status updated' });
  });
});

module.exports = router;
