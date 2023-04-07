const router = require('express').Router();
let User = require('../models/user.model');
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const mail=req.body.mail;
  const password=req.body.password;
  if(!username || !mail || !password){
    return res.status(422).json({error:"Mandatory fields"})
  }
  else if(!username.match(/^[a-zA-Z]*$/)){
    return res.status(422).json({error:"Name should only contain alphabets"})
  }
  else if(!mail.match(/^[0-9a-zA-Z]*[@]{1}[a-zA-Z]{3,}[\.]{1}[a-zA-Z]{2,}$/)){
    return res.status(422).json({error:"Bad formatted email"})
  }
  else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/)){
    return res.status(422).json({error:"Password is not strong enough"})
  }
  User.findOne({mail:mail}).then((savedMail) => {
    if(savedMail){
        return res.status(422).json({error:"User with the given Mail ID already exist"})
    }
    else{
      const newUser = new User({
        username,
        mail,
      password,
      });
      newUser.save()
      .then(() => res.json({message:'User added!'}))
      .catch(err => res.status(400).json({error:"Some error ocurred"}));
    }
  })
});
router.route('/search').post((req, res) => {
  const mail=req.body.mail;
  const password=req.body.password;
  if(!mail || !password){
    return res.status(422).json({error:"Mandatory fields"})
  }
  else if(!mail.match(/^[0-9a-zA-Z]*[@]{1}[a-zA-Z]{3,}[\.]{1}[a-zA-Z]{2,}$/)){
    return res.status(422).json({error:"Bad formatted email"})
  }
  User.findOne({ $and: [{ mail:mail }, { password: password }] }).then((foundUser) => {
    if(foundUser){
        return res.json({message:"Redirecting to homepage.."})
    }
    else{
      return res.status(400).json({error:"Invalid Credentials"});
    }
  }).catch(err=>{ res.status(400).json({error:"Unknown error encountered"});})
});
module.exports = router;