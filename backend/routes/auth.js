const express = require('express');
const router = express.Router();

var fetchuser = require('../middleware/fetchuser');
const { AuthValidation, UsernameValidation } = require('../validations/AuthValidation');

const createuser  = require('../controllers/authControllers/createuser');
const loginuser  = require('../controllers/authControllers/loginuser');
const updateuser  = require('../controllers/authControllers/updateuser');


// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', AuthValidation, createuser);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', loginuser);

// ROUTE 4: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.put('/updateuser', fetchuser, UsernameValidation, updateuser);

module.exports = router;