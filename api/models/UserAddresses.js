/**
 * UserAddresses.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "ym_user_addresses",
  attributes: {
    user: {
      model: 'user',
      columnName: 'user_id',
    },
    transferee: {
      type: 'string',
      required: true,
    },
    emergency_tel: {
      type: 'string',
      required: true,
    },
    landline_tel: {
      type: 'string',
      required: true,
    },
    town_id: {
      type: 'number',
      allowNull: true,
      defaultsTo: 19
    },
    place_id: {
      type: 'number',
      allowNull: true,
      defaultsTo: 19
    },
    district: {
      type: 'string',
      required: true,
    },
    postal_address: {
      type: 'string',
      required: true,
    },
    postal_code: {
      type: 'string',
      required: true,
    }
  }
};

