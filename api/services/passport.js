const passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy;

passport.use('bearer', new BearerStrategy(
  function(accessToken, done) {
    Tokens.findOne({token: accessToken}, function(err, token) {
      if (err) return done(err);
      if (!token) return done(null, false);
      if (token.userId != null) {
        Users.find(token.userId, function(err, user) {
          if (err) return done(err);
          if (!user) return done(null, false);
          // to keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes
          const info = {scope: '*'};
          done(null, user, info);
        });
      }
      else {
        //The request came from a client only since userId is null
        //therefore the client is passed back instead of a user
        Clients.find({clientId: token.clientId}, function(err, client) {
          if (err) return done(err);
          if (!client) return done(null, false);
          // to keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes
          const info = {scope: '*'};
          done(null, client, info);
        });
      }
    });
  }
));
