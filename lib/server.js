'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());


module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`)
    })
  }
}