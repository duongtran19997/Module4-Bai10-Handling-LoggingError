import passport from "passport"
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import {user} from "../schema/user.model";

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use('local', new LocalStrategy(async (username, password, done) => {
    const User = await user.findOne({username: username});
    if (!User) {
        return done(null, false)
    } else {
        if (User.password === password) {
            return done(null, User)
        } else {
            return done(null, false)
        }
    }
}));

passport.use(new GoogleStrategy({
        clientID: "974260312324-a8iuqjb0bcdjbak79bgblp1tf9pli5ar.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile, 'profile')
            let existingUser = await user.findOne({'google.id': profile.id});
            // if user exists return the user
            console.log(existingUser);
            if (existingUser) {
                return done(null, existingUser);
            }
            // if user does not exist create a new user
            console.log('Creating new user...');
            const newUser = new user({
                google: {
                    id: profile.id,
                },
                username: profile.emails[0].value,
                password: null
            });
            await newUser.save();
            console.log(newUser, 'newUser')
            return done(null, newUser);
        } catch (error) {
            return done(null, false)
        }
    }
))

export default passport