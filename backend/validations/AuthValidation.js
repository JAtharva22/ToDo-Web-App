const { body } = require('express-validator');

const AuthValidation = [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
]

const UsernameValidation = [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
]

module.exports = { AuthValidation, UsernameValidation };