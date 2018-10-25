/**
 * UserRoles.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'ym_user_roles',
  attributes: {
    name:{
      type: 'string',
      required: true
    },
    role:{
      type: 'string',
      required: true
    },
  },

};

