/**
 * UserDetails.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "ym_user_details",
  attributes: {
    user: {
      model: 'user',
      columnName: 'user_id',
    },
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    mobile: {
      type: 'string',
    },
    zip_code: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    avatar: {
      type: 'string',
    }
  }
};

