const { body } = require('express-validator');

const signupValidator = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('email').isEmail().notEmpty().withMessage('Email is required!'),
  body('password').notEmpty().withMessage('Password is required!'),
];

module.exports = {
  signupValidator,
};
