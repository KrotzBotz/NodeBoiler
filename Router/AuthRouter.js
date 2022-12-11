const express = require('express');
const authController = require('../Controllers/AuthController');
const verifySignup = require('../Controllers/SingupController');

const unitRouter = express.Router();

unitRouter.route('/login').post(authController.login);
unitRouter.route('/signup').post(verifySignup, authController.signup);

//unitRouter.route('/').get(api.getAllUnits).post(api.checkBody, api.createUnit);

module.exports = unitRouter;
