const mongoose = require('mongoose')

const MedicineSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  composition: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  prescription: {
    type: Boolean,
    required: true
  },
  mrp: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  bestPrice: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Medicine = mongoose.model('Medicine', MedicineSchema)

module.exports = Medicine;