/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  register: async function (req, res) {
    console.log(sails.config.sms.lineNumber);
    return;
    let user = req.param('user');
    // let userAddress = req.param('userAddress');

    // set defaults
    user.status = 'active';
    user.role = 1;
    user.create_date = Math.floor(Date.now() / 1000);

    let model;
    try {
      model = await User.create(user).fetch();
    } catch (err) {
      let result = {
        status: false,
        code: err.code,
        message: err.details
      };
      return res.send(result);
    }

    // userAddress.user = model.id;
    //
    // let addressModel;
    // try {
    //   addressModel = await UserAddresses.create(userAddress).fetch();
    // } catch (err) {
    //   let result = {
    //     status: false,
    //     code: err.code,
    //     message: err.details
    //   };
    //   return res.send(result);
    // }

    let result = {
      status: true,
      user_id: model.id,
      // address_id: addressModel.id
    };

    return res.send(result);
  }
};
