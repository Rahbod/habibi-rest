/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

async function sendVerification(number, code) {
  // let r = await sms.token(sails.config.sms.apiKey,sails.config.sms.securityKey);
  let sms = require('sails-sms-ir');
  let message = `کد ورود شما: ${code} می باشد.`;
  return await sms.send(message, number, sails.config.sms.apiKey, sails.config.sms.securityKey, sails.config.sms.lineNumber);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  register: async function (req, res) {
    let mobile = req.param('mobile');
    if (!mobile) {
      let result = {
        status: false,
        code: -1,
        message: "Mobile number not been sent."
      };
      return res.send(result);
    }

    let model = false;
    try {
      model = await User.findOne({username: mobile});
    } catch (err) {
      let result = {
        status: false,
        code: err.code,
        message: err.details
      };
      return res.send(result);
    }

    user = {};
    user.verification_token = getRandomInt(12313, 99999);
    if (model) {
      try {
        await User.update({username: mobile}).set(user);
        model = await User.findOne({username: mobile});
        await sendVerification(model.username, model.verification_token);
      } catch (err) {
        let result = {
          status: false,
          code: err.code,
          message: err.details
        };
        return res.send(result);
      }
    }
    else {
      // set defaults
      user.username = mobile;
      user.password = mobile;
      user.status = 'pending';
      user.role = 1;
      user.create_date = Math.floor(Date.now() / 1000);
      try {
        model = await User.create(user).fetch();
        await sendVerification(model.username, model.verification_token);
      } catch (err) {
        let result = {
          status: false,
          code: err.code,
          message: err.details
        };
        return res.send(result);
      }
    }

    return res.send({status: true});
  },

  verification: async function(req, res) {
    let mobile = req.param('mobile');
    let code = req.param('code');
    if (!mobile || !code) {
      let result = {
        status: false,
        code: -1,
        message: "Mobile number or Code not been sent."
      };
      return res.send(result);
    }

    let model;
    try {
      model = await User.findOne({username: mobile});
      if (!model) {
        let result = {
          status: false,
          code: -1,
          message: "User not found."
        };
        return res.send(result);
      } else if (model.verification_token != code) {
        let result = {
          status: false,
          code: -2,
          message: "Verification Code invalid."
        };
        return res.send(result);
      }

      // update user
      await User.update({username: mobile}).set({status: 'active', verification_token: null});
      model = await User.findOne({username: mobile});
    } catch (err) {
      let result = {
        status: false,
        code: err.code,
        message: err.details
      };
      return res.send(result);
    }

    let result;
    if (model.status === 'active') {
      result = {
        status: true,
        user_id: model.id,
        code: model.verification_token,
      };
    } else {
      result = {
        status: false,
        code: -3,
        message: "User not activated! please try again."
      };
    }

    return res.send(result);
  },

  addAddress: async function(req, res){
    // let userAddress = req.param('userAddress');
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
  }
};
