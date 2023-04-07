const router = require('express').Router();
let Donate = require('../models/donate.model');

router.route('/').get((req, res) => {
  donate.find()
    .then(donates => res.json(donates))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/donate').post((req, res) => {
  const pname = req.body.pname;
  const quant = req.body.quant;
  const description = req.body.description;

  const newdonate = new Donate({
    pname,
    quant,
    description,
  });

  newdonate.save()
  .then(() => res.json({message:'Donation added!'}))
  .catch(err => res.status(400).json({error:"Some error ocurred"}));;
});
module.exports = router;