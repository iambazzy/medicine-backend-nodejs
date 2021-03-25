require('dotenv').config();
const jwt = require('jsonwebtoken');
const { extractToken } = require('../Helpers/helpers');

exports.isAdmin = async (req, res, next) => {
  const { key } = req.body;

  if (key === undefined || key === '' || key === null) {
    return res.status(400).json({ code: 400, message: 'Something is missing' });
  }

  if (key !== process.env.ADMINSECRET) {
    return res.status(401).json({ code: 401, message: `Sorry - You don't have admin rights!` });
  }

  // ALL GOOD
  next();
}

exports.verifyAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = extractToken(authorization);
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (decoded && decoded.id === process.env.ADMINSECRET) {
      next();
    } else {
      res.status(401).json({ valid: false, message: 'No Admin rights!' });
    }
  } catch (e) {
    res.status(401).json({ valid: false, message: 'Invalid Signature!' });
  }  
}