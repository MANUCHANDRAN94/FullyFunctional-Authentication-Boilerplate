const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//Define our model
const userSchema = new Schema({
    email: { type: String , unique:true , lowercase:true },
    password: String
});

// On save hoook , encrypt password
userSchema.pre('save' , function(next){ //this means save this function previous to save
    const user= this; // get access to user model
 
    //gen salt and run call back
    bcrypt.genSalt(10 , function(error , salt){
        if(error){return next(error)}

        //hash (encrypt) our pass word using salt
        bcrypt.hash(user.password , salt , null , function(error , hash){
            if(error){return next(error)}

            //pverwrite planetest pass with hash password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword =function(candidatePassword , callback){
    bcrypt.compare(candidatePassword , this.password , function(err , isMatch){
        if(err){return callback(err);}

        callback(null , isMatch);
    });
}

//Create the model class
const modelClass = mongoose.model('user' , userSchema);

//Export the model
module.exports = modelClass;