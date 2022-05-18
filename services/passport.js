// configuration for passport
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id points to the _id in mongo
  // we use it rather than googleId. We want to do this because
  // this allows a user to sign in with other services like twitter
  // and twitter id is not the same as googleId
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          // proceed with the auth flow
          done(null, user); // tells passport here is the user that exisits
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((newUser) => done(null, newUser));
        }
      });
    }
  )
);
