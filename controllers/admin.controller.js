const AdminService = require('../services/admin.service');    

exports.signup = async (req, res, next) => {
  const { username, password, key } = req.body;

  if (username === undefined || password === undefined || key === undefined) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  if (username === '' || password === '' || key === '') {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  AdminService.createAdmin(req.body)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  })
}

exports.signin = async (req, res, next) => {
  const { username, password, key } = req.body;

  if (username === undefined || password === undefined || key === undefined) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  if (username === '' || password === '' || key === '') {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  AdminService.signInAdmin(req.body)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}