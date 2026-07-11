const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/usermodal");
const Organization = require("../models/orgmodel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
      const email = profile.emails[0].value.toLowerCase();
      const name = profile.displayName;
      let user = await User.findOne({
          email
      }).populate("organization");
       if (user) {
          return done(null, user);
        }
        return done(null, {
          isNewUser: true,
          name,
          email,
        });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;