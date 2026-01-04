const express = require('express');
const { getStores, getStoresByOwner } = require('../models/storeModel');
const { getProductsByStore } = require('../models/productModel');
const { createOrder, addOrderItem, getOrdersByBuyer } = require('../models/orderModel');

const router = express.Router();

// GET all stores
router.get('/stores', (req, res) => {
  getStores((err, stores) => {
    if (err) return res.status(500).json({ error: err });
    res.json(stores);
  });
});

// GET products for a store
router.get('/stores/:storeId/products', (req, res) => {
  const storeId = req.params.storeId;
  getProductsByStore(storeId, (err, products) => {
    if (err) return res.status(500).json({ error: err });
    res.json(products);
  });
});

// POST create new order
router.post('/orders', (req, res) => {
  const { buyerId, storeId, items } = req.body; // items = [{productId, quantity}, ...]
  
  createOrder(buyerId, storeId, 'pending', (err, orderResult) => {
    if (err) return res.status(500).json({ error: err });
    const orderId = orderResult.insertId;

    // Insert each item
    items.forEach(item => {
      addOrderItem(orderId, item.productId, item.quantity, (err2) => {
        if (err2) console.error(err2);
      });
    });

    res.json({ orderId });
  });
});

// GET buyer orders
router.get('/orders/:buyerId', (req, res) => {
  const buyerId = req.params.buyerId;
  getOrdersByBuyer(buyerId, (err, orders) => {
    if (err) return res.status(500).json({ error: err });
    res.json(orders);
  });
});

module.exports = router;
