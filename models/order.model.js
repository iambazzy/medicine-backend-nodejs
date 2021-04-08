const mongoose = require('mongoose');

const order = new mongoose.Schema({
  address: {
    type: Object,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  fulfilled: {
    type: Boolean,
    default: false
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const OrderSchema  = new mongoose.Schema({
  orders: [ order ]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;