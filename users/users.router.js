const express = require('express');
const usersRouter = express.Router();
const controller = require('./users.controllers');
const {
  usersValidationMiddleware,
  subscriptionValidationMiddleware,
} = require('./users.validators');
const { authMiddleware } = require('../auth/auth.middleware');
const multer = require('multer');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

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
usersRouter.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  controller.updateUserAvatarHandler
);

module.exports = usersRouter;
