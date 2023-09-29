const express = require('express');
const usersRouter = express.Router();
const controller = require('./users.controllers');

usersRouter.post('/singup', controller.signupHandler);

module.exports = usersRouter;
