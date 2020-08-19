const Authentication = require('./controllers/authentication');
const passport = require('passport');
const passportservice = require('./services/passport');

const requireAuth = passport.authenticate('jwt' , {session: false})
const requireSignin = passport.authenticate('local' , {session:false})
//oru cookie session default aayi create cheyum adh vende paranjathanu ({session:false})


module.exports = function (app){
    app.get('/' , requireAuth , (req,res)=>{
        res.send({success:'hi there'})
    })
    app.post('/signup' , Authentication.signup)
    app.post('/signin' ,requireSignin ,Authentication.signin)

}