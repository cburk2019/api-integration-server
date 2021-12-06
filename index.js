require('dotenv').config();
const app = require('./src/server');
const { db } = require('./src/models');
const PORT = process.env.PORT || 3003;

db.sync().then(() => {
  app.start(PORT);
});