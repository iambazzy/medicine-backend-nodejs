const mongoose = require('mongoose');

const CartSchema  = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;