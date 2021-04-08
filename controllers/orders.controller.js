const OrderService = require('../services/orders.service');

// ADD ORDER
exports.addOrder = async (req, res, next) => {
  const { address, products } = req.body;

  if (address === undefined || products === '') {
    return res.status(422).json({ code: 422, message: 'Something Is Invalid or Missing' });
  }

  if (Object.keys(address).length === 0 || products.length === 0) {
    return res.status(422).json({ code: 422, message: 'Phone Number Is Invalid or Missing' });
  }

  OrderService.addOrder(req.body, req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// GET ORDERS
exports.getOrder = async (req, res, next) => {
  let { nop } = req.query;
  OrderService.getOrder(nop, req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// UPDATE ORDERS
exports.cancelOrder = async (req, res, next) => {

}