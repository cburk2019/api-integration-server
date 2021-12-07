'use strict';

const express = require('express');

const apiRouter = express.Router();

apiRouter.post('/api/test', (req, res, next) => {
  console.log('Hitting /api/test route');
  res.status(200).send('Partner, it\'s a work in progress.');
});

module.exports = apiRouter;
