const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  addresses: [
    {
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true
      },
      landmark: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;