'use strict';

const { User } = require('../model/index');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await User.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (err) {
    res.status(403).send('Invalid Login');
  }
};
