const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose  = require('mongoose');

var userModel = mongoose.model('User');

// note email field as username
passport.use(new 
    localStrategy({ usernameField: 'email',passwordField: 'password'} ,(username, password, done)=> {
    userModel.findOne({email: username}, 
        (err, user)=> {
            if(err){
                return done(err);

            }else if(!user){
                console.log('user not found');
                return done(null, false,{message: 'User not found.'});

            }else if(!user.verifypassword(password)){
                console.log('wrong password');
                return done(null, false, {message: 'wrong password'});
            }else{
                // if credentials are correct , return user object...
                console.log('credentials are correct.');
                return done(null, user);
            }
        });
    })
    );