'use strict';

const express = require('express');
const app = express();
app.use(express.json());

const { db } = require('../lib/model/index');
const authroutes = require('./router/auth');
app.use(authroutes);


db.sync()
  .then(() => {
    app.listen(3000);
  });

module.exports = {
  server: app,
};