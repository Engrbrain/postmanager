const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  //console.log(req.body.password)
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(
      result => {
        res.status(201).json({
          message: 'User created',
          result: result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
};

exports.userLogin = (req, rex, next) => {
  let fetchedUser;
 User.findOne({ email: req.body.email })
 .then(user => {
   if (!user){
     return res.status(401).json({
       message: "Invalid authentication credentials!"
     });
   }
   fetchedUser = user;
   return bcrypt.compare(req.body.password, user.password);
 })
 .then(result => {
  if (!result){
    return res.status(401).json({
      message: "Invalid authentication credentials!"
    });
  }
const token = jwt.sign(
  {email: fetchedUser.email, userid: fetchedUser._id},
  "Awnkm0akm?##Fetele03017761988%%D3fault100$%%",
  { expiresIn: "1h" }
 );
 res.status(200).json({
   token: token,
   expiresIn: 3600, // Duration of 1 Hour in Seconds
   userId: fetchedUser._id
 });
 })
 .catch(err => {
  message: "Auth failed"
 });
};
