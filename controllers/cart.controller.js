const CartService = require('../services/cart.service');

exports.addToCart = async (req, res, next) => {
  const { product, orderQuantity } = req.body;
  if (Object.keys(product).length === 0 || orderQuantity === 0) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  if (product === undefined || orderQuantity === undefined) {
    return res.status(422).json({ code: 422, message : 'Missing Items' });
  }

  CartService.addProductToCart(product, orderQuantity, req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  }); 
}

exports.updateProductInCart = async (req, res, next) => {
  
}

exports.getCart = async (req, res, next) => {
  
}

exports.removeProductFromCart = async (req, res, next) => {
  
}

