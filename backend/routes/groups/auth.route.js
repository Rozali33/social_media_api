
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const { registrationRules, validateRequests } = require ('../../middleware/validator');


router.post('/registration', registrationRules(), validateRequests, authController.registration);
router.post('/login', authController.login);

module.exports = router;