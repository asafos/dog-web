import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const Users = mongoose.model('Users');

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  (email, password, done) => {
    Users.findOne({ email })
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }

        return done(null, user);
      }).catch(done);
  }));

passport.serializeUser((user, done) => {
  done(null, user._id)
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  })
});

export default passport;