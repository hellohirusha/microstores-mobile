const db = require('../db');

function createOrder(buyerId, storeId, status = 'pending', callback) {
  const query = 'INSERT INTO orders (buyer_id, store_id, status) VALUES (?, ?, ?)';
  db.query(query, [buyerId, storeId, status], callback);
}

function addOrderItem(orderId, productId, quantity, callback) {
  const query = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)';
  db.query(query, [orderId, productId, quantity], callback);
}

function getOrdersByBuyer(buyerId, callback) {
  const query = 'SELECT * FROM orders WHERE buyer_id = ?';
  db.query(query, [buyerId], callback);
}

function getOrdersByStore(storeId, callback) {
  const query = `
    SELECT o.*, u.email AS buyer_email
    FROM orders o
    JOIN users u ON o.buyer_id = u.id
    WHERE o.store_id = ?
  `;
  db.query(query, [storeId], callback);
}

function updateOrderStatus(orderId, status, callback) {
  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(query, [status, orderId], callback);
}

function getOrderItems(orderId, callback) {
  const query = 'SELECT * FROM order_items WHERE order_id = ?';
  db.query(query, [orderId], callback);
}

module.exports = {
  createOrder,
  addOrderItem,
  getOrdersByBuyer,
  getOrdersByStore,
  updateOrderStatus,
  getOrderItems
};
