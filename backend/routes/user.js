const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/signup", (req, res, next) => {
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
          error: err
        });
      });
  });
});

router.post("/login", (req, rex, next) => {
 User.findOne({ email: req.body.email })
 .then(user => {
   if (!user){
     return res.status(401).json({
       message: "Auth failed"
     });
   }
   return bcrypt.compare(req.body.password, user.password);
 })
 .then(result => {
  if (!result){
    return res.status(401).json({
      message: "Auth failed"
    });
  }
const token = jwt.sign({email: user.email, userid: user._id}, 'Awnkm0akm?##Fetele03017761988%%D3fault100$%%',
 { expiresIn: "1h" });
 })
 .catch(err => {
  message: "Auth failed"
 });
});

module.exports = router;
