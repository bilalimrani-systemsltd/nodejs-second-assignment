const express = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();

const UserModel = require('../models/user.model');
const { signupValidator } = require('../requestsValidators.js');

/* Signup user. */
router.post('/signup', signupValidator, async (req, res) => {
  try {
    const { email } = req.body;
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.send({ errors: results.array() });
    }

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.send('Already user with this email!');
    }
    const data = await UserModel.create(req.body);

    return res.send(data);
  } catch (error) {
    console.log('error', error);
    return res.send('error');
  }
});

/* GET home page. */
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email }).lean();

  if (user) {
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });

    // save user token
    user.token = token;
    res.send(user);
  } else {
    res.send('user not found');
  }
});

module.exports = router;
