'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const routes = require('./router/auth')
app.use(cors());

app.use(routes);
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`)
    })
  }
};
