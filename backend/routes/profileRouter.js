const express = require("express")
const { getUserProfile, updateUserName, updateUserLocation, updateUserBio } = require('../controllers/profileController');  // Import controller functions
const profileRouter = express.Router();

profileRouter.get('/:id', getUserProfile)
profileRouter.patch('/update/name', updateUserName)
profileRouter.patch('/update/location', updateUserLocation)
profileRouter.patch('/update/bio', updateUserBio)

module.exports = profileRouter;