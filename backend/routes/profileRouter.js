const express = require("express")
const { getUserProfile, updateUserName, updateUserLocation, updateUserBio, getOtherUsers } = require('../controllers/profileController');  // Import controller functions
const profileRouter = express.Router();

profileRouter.get('/profile', getUserProfile)
profileRouter.patch('/update/name', updateUserName)
profileRouter.patch('/update/location', updateUserLocation)
profileRouter.patch('/update/bio', updateUserBio)
profileRouter.get('/other', getOtherUsers)

module.exports = profileRouter;