'use strict';

const express = require('express');
const router = express.Router();
const { Users } = require('../model/index');

router.post('/signup', async (req, res) => { 
  try {
    let userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      // token: userRecord.token,
    };
    res.status(201).json(output);
  } catch(err) {
    res.status(400).send({err});
  }
});


module.exports = router;
