const express = require('express');
const usersRouter = express.Router();
const controller = require('./users.controllers');
const {
  usersValidationMiddleware,
  subscriptionValidationMiddleware,
} = require('./users.validators');
const { authMiddleware } = require('../auth/auth.middleware');

usersRouter.post(
  '/signup',
  usersValidationMiddleware,
  controller.signupHandler
);
usersRouter.post('/login', usersValidationMiddleware, controller.loginHandler);
usersRouter.get('/current', authMiddleware, controller.currentHandler);
usersRouter.patch(
  '/',
  subscriptionValidationMiddleware,
  authMiddleware,
  controller.subscriptionHandler
);
usersRouter.post('/logout', authMiddleware, controller.logoutHandler);

module.exports = usersRouter;
