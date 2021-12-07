'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

const UserTable = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'User',
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
        defaultValue: 'user',
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
            user: ['read', 'create'],
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

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };
  
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = UserTable;
