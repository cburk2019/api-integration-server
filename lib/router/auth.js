'use strict';

const express = require('express');
const router = express.Router();
const { Users } = require('../model/index');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');

router.use('/api/*', bearerAuth);

router.post('/signup', async (req, res) => {
  console.log('Hello Jacob');
  try {
    let userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (err) {
    res.status(400).send({ err });
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

module.exports = router;
