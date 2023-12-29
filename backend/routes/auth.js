const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


router.post('/createuser', [
   body('name', 'enter a valid name').isLength({ min: 2 }),
   body('password').isLength({ min: 5 }),
   body('email', 'enter valid email address').isEmail(),
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   // check whether the user with this email exists already
   try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
         return res.status(400).json({ error: "sorry a user with this email already exists" })
      }
      user = await User.create({
         name: req.body.name,
         password: req.body.password,
         email: req.body.email,
      })

      res.json(user)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
   }
})

module.exports = router;