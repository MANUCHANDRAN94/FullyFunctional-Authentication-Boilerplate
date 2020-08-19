const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; 

//setup options for JWT strategy
    
const jwtOptions = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),  //we need to tell where to look for the token in req
    secretOrKey: config.secret       //we get the payload. to get that from token we need to tell passport about the secret key            
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions , function(payload , done){
    //this payload is the jwt token that we have sent 

    //Seee if the user Id in the payload exists in our db ,
    //If it does  , call 'done' with that
    //Otherwise , call done without user object

    User.findById(payload.sub , function(err , user){
        if(err){return done(err , false)} //when user is not found in db

        if(user){
            done(null , user)
        }
        else {
            done(null , false)
        }
    })
})

//Tell passport to use this strategy