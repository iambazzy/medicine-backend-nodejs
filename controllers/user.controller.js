const UserService = require('../services/user.service'); 
const AddressService = require('../services/address.service');

// SIGNING UP A USER
exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, password, phone } = req.body;

  if (firstname === undefined || lastname === undefined || phone === undefined || email === undefined || password === undefined) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  if (firstname === '' || lastname === '' || phone === '' || email === '' || password === '') {
    return res.status(422).json({ code: 422, message : 'Invalid Parameter Values' });
  }

  UserService.createUser(req.body)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// LOGIN A USER
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  if (email === '' || password === '') {
    return res.status(422).json({ code: 422, message : 'Invalid Parameter Values' });
  }

  UserService.signIn(req.body)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// ADD ADDRESS
exports.addAddress = async (req, res, next) => {
  const { firstname, lastname, street, pincode, landmark, phone } = req.body;

  // Phone number Validation
  if (phone === undefined || phone === '') {
    return res.status(422).json({ code: 422, message: 'Phone Number Is Invalid or Missing' });
  }

  // Phone number length Validation
  if (phone.length > 13 || phone.length < 10) {
    return res.status(400).json({ code: 400, message: 'Phone Number Format Is Invalid' });
  }
  
  // Name Validation
  if (firstname === '' || lastname === '') {
    return res.status(422).json({ code: 422, message: 'Firstname / Lastname Is Missing' });
  }

  // Address Validations
  if (street === '' || pincode === '' || landmark === '') {
    return res.status(422).json({ code: 422, message: 'Something In Address Is Missing' });
  }

  // All good!
  AddressService.addAddress(req.body, req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// Get address
exports.getAddress = async (req, res, next) => {
  AddressService.getUserAddresses(req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// Update Address
exports.updateAddress = async (req,res, next) => {
  const { addressId } = req.query;
  const { firstname, lastname, street, city, pincode, landmark, phone, state } = req.body;

  // User id validation
  if (addressId === '' || addressId === undefined) {
    return res.status(422).json({ code: 422, message: 'Missing Params' })
  }

  // Phone number Validation
  if (phone === undefined || phone === '') {
    return res.status(422).json({ code: 422, message: 'Phone Number Is Invalid or Missing' });
  }

  // Name Validation
  if (firstname === '' || lastname === '') {
    return res.status(422).json({ code: 422, message: 'Firstname / Lastname Is Missing' });
  }

  // Address Validations
  if (street === '' || city === '' || pincode === '' || landmark === '' || state === '') {
    return res.status(422).json({ code: 422, message: 'Something In Address Is Missing' });
  }

  AddressService.updateUserAddress(addressId, req.body, req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// Delete Address
exports.deleteAddress = async (req, res, next) => {
  const { addressId } = req.query;

  if (addressId === '' || addressId === undefined) {
    return res.status(422).json({ code: 422, message: 'Something Is Missing' });
  }

  AddressService.deleteAddress(addressId, req.headers)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// VErify Token
exports.verifyToken = async (req, res, next) => {
  const { token } = req.body;
  UserService.verifytoken(token)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}