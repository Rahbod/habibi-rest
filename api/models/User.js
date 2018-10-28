/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = {
  tableName: "ym_users",
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      isEmail: true,
      unique: true,
      allowNull: true
    },
    role: {
      model: 'UserRoles',
      columnName: 'role_id'
    },
    create_date: {
      type: 'string',
    },
    status: {
      type: 'string'
    },
    verification_token: {
      type: 'string',
      allowNull: true
    },
    change_password_request_count: {
      type: 'number',
      allowNull: true,
      defaultsTo: 0
    },
    auth_mode: {
      type: 'string',
      allowNull: true,
      defaultsTo: 'api'
    },
    state_id: {
      type: 'number',
      allowNull: true
    }
  },
  customToJSON: function () {
    return _.omit(this, [
      'password',
      'auth_mode',
      'change_password_request_count'])
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  },
  afterCreate: async function (user, cb) {
    await UserDetails.create({
      user: user.id
    });
  }
};
