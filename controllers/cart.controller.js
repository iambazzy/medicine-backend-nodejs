const CartService = require('../services/cart.service');

// ADD TO CART
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


// GET FROM CART
exports.getCart = async (req, res, next) => {
  CartService.getCart(req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}


// REMOVE FROM CART
exports.removeProductFromCart = async (req, res, next) => {
  const { productId } = req.query;

  if (productId === '' || productId === undefined) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  CartService.deleteInCart(productId, req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

