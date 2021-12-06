'use strict';

const base64 = require('base-64');
const { User } = require('../model/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('No authorization header in POST request');
  }

  let basicHeaderParts = req.headers.authorization.split(' ');


  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    req.user = await User.authenticateBasic(username, password);

    if (req.user) {
      res.status(201);
      next();
    } else {
      next('Invalid User');
    }
  } catch (err) {
    res.status(403).send('Invalid Login');
  }
};
