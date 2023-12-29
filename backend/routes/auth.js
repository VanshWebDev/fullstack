const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


router.post('/', [
   body('name', 'enter a valid name').isLength({ min: 2 }),
   body('password').isLength({ min: 5 }),
   body('email', 'enter valid email address').isEmail(),
], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
   }).then(user => res.json(user))
      .catch(err => {
         console.log(err)
         res.json({ error: "please enter a valid email address", message: err.message })
      })

})

module.exports = router;