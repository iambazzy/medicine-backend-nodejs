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
