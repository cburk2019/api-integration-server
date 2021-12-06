'use strict';

require('dotenv').config();
const app = require('./lib/server.js')
const { db } = require('./lib/model/index.js');

db.sync().then(() => {
  app.start(process.env.PORT || 3000);
});
