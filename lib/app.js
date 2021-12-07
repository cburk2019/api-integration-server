'use strict';

const express = require('express');
const app = express();
app.use(express.json());

const authroutes = require('./router/auth');
app.use(authroutes);

module.exports = {
  server: app,
};
