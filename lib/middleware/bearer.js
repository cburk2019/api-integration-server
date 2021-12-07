'use strict';

const { Users } = require('../model/index');

module.exports = async (req, res, next) => {
  try {
    console.log('Hitting here, bearerJS');
    if (!req.headers.authorization) {
      next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await Users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (err) {
    res.status(403).send('Invalid Login');
  }
};
