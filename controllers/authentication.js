const { model } = require("../models/user");
const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "Enter a valid email and password" });
  }
  //Seee if the user witth a givemn email id exists
  User.findOne({ email: email }, (error, existingUser) => {
    if (error) {
      return next(error);
    }
    //If a user with email does exists , return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email already exists" });
    }
    //If a user with a email does not exists , create and save user record

    const newUser = new User({
      email: email,
      password: password,
    });

    newUser.save((err, savedUser) => {
      if (err) {
        return next(err);
      }

      //respond to user indicating the user was created

      res.json({ token: tokenForUser(savedUser) });
    });
  });
};
