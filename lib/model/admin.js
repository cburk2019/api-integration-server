'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

const AdminTable = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Admin',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'admin',
      },
      token: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return jwt.sign({ username: this.username, id: this.id }, SECRET);
        },
      },
      capabilities: {
        type: DataTypes.VIRTUAL,
        get() {
          const acl = {
            user: ['read'],
            admin: ['read', 'create', 'update', 'delete']
          };
          return acl[this.role];
        }
      }
    });

  model.beforeCreate(async user => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  return model;
};

module.exports = AdminTable;
