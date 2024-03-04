const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Proverava da li vec postoji korisnik u bazi sa datim googleId
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Ako ne postoji, kreira novog korisnika
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            photo: profile.picture,
            name: profile.given_name,
            email: profile.emails[0].value,
            password: "Google nalog",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
