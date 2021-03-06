const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, done) {
  passport.authenticate('bearer', {session: false}, function(err, user, info) {
    if (err) return done(err);
    if (user) return done();

    return res.status(403).send({message: "You are not permitted to perform this action."});
  })(req, res);
};
