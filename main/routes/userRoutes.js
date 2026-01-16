const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get("/editProfile", userController.getEditProfile);

userRouter.put("/editProfileData", userController.editProfileData);

module.exports = {userRouter}
