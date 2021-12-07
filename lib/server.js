'use strict';

const express = require('express');
const app = express();
const authRouter = require('./router/auth');
// const apiRouter = require('./router/api.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
// app.use(apiRouter);

app.post('/api/test', (req, res, next) => {
  console.log('Hitting /api/test route');
  res.status(200).send('Partner, it\'s a work in progress.');
});

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  },
};
