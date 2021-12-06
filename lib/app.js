'use strict';

const express = require('express');
const app = express();

const { db } = require('../lib/model/index');
const authroutes = require('./router/auth');
app.use(authroutes);


db.sync()
  .then(() => {

    // Start the web server
    app.listen(3000);
  });

module.exports = {
  server: app,
};