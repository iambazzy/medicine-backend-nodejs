require('dotenv').config();
const jwt = require('jsonwebtoken');
const { extractToken } = require('../Helpers/helpers');

exports.verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = extractToken(authorization);
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (decoded) {
      next();
    }
  } catch (e) {
    res.status(401).json({ valid: false, message: 'Invalid Signature!' })
  }  
}