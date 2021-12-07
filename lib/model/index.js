'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const UserTable = require('./user.js');

const sequelize = new Sequelize('sqlite:memory');
const Users = UserTable(sequelize, DataTypes);
const Admin = AdminTable(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Users,
  Admin
};
