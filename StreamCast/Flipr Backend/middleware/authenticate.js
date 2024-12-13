const googleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
require("../model/user");
const User = mongoose.model('User');

require("dotenv").config();

passport.use(new googleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        User.findOne({ name: profile.displayName }, function (err, doc) {
            if (err) {
                return console.log(err);
            } else if (!doc) {
                const newModel = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });

                newModel.save(function (err, doc) {
                    if (err)
                        return console.log(err);
                    return cb(err, doc);
                });
            }
            else {
                return cb(err, doc);
            }
        });
    }
));

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
},
    (name, password, cb) => {
        User.findOne({ name: name }, (err, user) => {
            if (err) {
                console.log(err);
                return cb(err);
            }
            if (!user) {
                console.log('incorrect username');
                return cb(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                console.log('incorrect pass');
                return cb(null, false, { message: 'Incorrect password.' });
            }
            return cb(null, user);
        });
    })
);

passport.serializeUser((user, done) => {
    // console.log('serializeUser', user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // console.log('deserializeUser', user);
    done(null, user);
});