const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    id: String,
    title: String,
    description: String,
    price: Number
  },
  selectedVariant: String,
  quantity: Number,
  customer: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    cardNumber: String,
    expiry: String,
    cvv: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Model name: 'Order' → collection name: 'orders'
module.exports = mongoose.model('Order', orderSchema);
