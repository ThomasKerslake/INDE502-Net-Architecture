const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/signup', (req, res) =>{
  res.render('signup');
})

router.post('/signup', (req, res) =>{
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  let errorMsgs = [];

  if(!firstName || !lastName || !email || !password || !confirmPassword){
    errorMsgs.push({msg: 'Please enter all the required information'});
  }

  if(password != confirmPassword){
    errorMsgs.push({msg: 'Passwords do not match'});
  }

  if(password.length < 6){
    errorMsgs.push({msg: 'Passwords need to be at least 6 chars long'});
  }

  if(errorMsgs.length > 0){
    res.render('signup', {
      errorMsgs,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });
  } else{
    User.findOne({email: email})
    .then(user =>{
      if(user){
        errorMsgs.push({msg: 'User already exists'});
        res.render('signup', {
          errorMsgs,
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user =>{
              req.flash('success_msg', 'Thanks for signing up')
              res.redirect('/account/signin')
            })
            .catch(err => console.log(err));
        }
      ))
      }
    })
  }
});


router.get('/signin', (req, res) =>{
  res.render('signin');
})

router.post('/signin', (req, res, next)=>{
  passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/account/signin',
    failureFlash: true
  })(req, res, next)
})


module.exports = router;
