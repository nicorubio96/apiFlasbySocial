require('dotenv').config()
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrategy({
        clientID: '998292612821-p7sncfir8ti581rtig6ei3ithgkv2voo.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
}
));

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});