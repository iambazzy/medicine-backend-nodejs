require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { id } = decoded;
    return id;
  } catch (e) {
    throw Error('Something happened in helpers', e);
  }
}

exports.extractToken = (s) => {
  try {
    const token = s.replace('Bearer ', '');
    return token;
  } catch (e) {
    throw Error('Cant extract token', e);
  }
}

// exports.checkPincode = (pincode) => {
//   const allowedPincodes = [190009, 190001, 190018, 190002, ];
//   if (allowedPincodes.indexOf(pincode) !== -1) {
//     return true;
//   }
//   return false;
// }

exports.EMPTY_CART = {
  total: 0,
  products: [],
  shippingCost: 0
}