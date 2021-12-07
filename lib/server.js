'use strict';

const express = require('express');
const app = express();
const authRouter = require('./router/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  },
};
