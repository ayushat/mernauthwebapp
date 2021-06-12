const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: 'NOT able to save user in DB.',
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      Created: user.createdAt,
    });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0],
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Username not found',
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'USERNAME and PASSWORD does not match.',
      });
    }
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // now put that token into user browser cookie
    res.cookie('token', token, { expire: new Date() + 999 });
    // send response to our frontend
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.send('User Signed Out Successfully');
  // res.json({
  //     message:"BBYEE....."
  // })
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
});

// Middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: 'Admin section,Access Denied',
    });
  }
  next();
};
