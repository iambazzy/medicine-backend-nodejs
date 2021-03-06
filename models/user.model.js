const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema  = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  addresses: {
    type: String,
    default: null
  },
  orders: {
    type: String,
    default: null
  },
  cart: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

UserSchema.index({ email: 1 }, { unique: true })

const User = mongoose.model('User', UserSchema)

module.exports = User;