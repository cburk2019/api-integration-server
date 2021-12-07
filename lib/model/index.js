'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const UserTable = require('./user.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';
const sequelizeConfig = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeConfig);
const Users = UserTable(sequelize, DataTypes);
const Admin = AdminTable(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Users,
  Admin
};
