const express = require('express');
const usersRouter = express.Router();
const controller = require('./users.controllers');
const usersValidationMiddleware = require('./users.validators');

usersRouter.post(
  '/signup',
  usersValidationMiddleware,
  controller.signupHandler
);
usersRouter.post('/login', usersValidationMiddleware, controller.loginHandler);

module.exports = usersRouter;
