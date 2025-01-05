const db = require("../db/queries");
const jwt = require('jsonwebtoken')

async function getUserProfile(req, res) { // note send entire user obj in body (for token)
    try {
        const decodedToken = db.getDecodedTokenFromHeader(req)

        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.fullName, location: userProfile.location, bio: userProfile.bio})
    } catch (error) {
        res.status(400).send('Error getting user profile data')
    }
}

async function updateUserName(req, res) {  // updates & sends updated profile
    try {
        const decodedToken = db.getDecodedTokenFromHeader(req)

        await db.updateName(req.body.newName, decodedToken.id)
        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.fullName, location: userProfile.location, bio: userProfile.bio})
        
    } catch (error) {
        res.status(400).send('Error updating name')
    }
}

async function updateUserLocation(req, res) {  // updates & sends updated profile
    try {
        const decodedToken = db.getDecodedTokenFromHeader(req)

        await db.updateLocation(req.body.newLocation, decodedToken.id)
        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.fullName, location: userProfile.location, bio: userProfile.bio})
        
    } catch (error) {
        res.status(400).send('Error updating name')
    }
}

async function updateUserBio(req, res) {  // updates & sends updated profile
    try {
        const decodedToken = db.getDecodedTokenFromHeader(req)

        await db.updateBio(req.body.newBio, decodedToken.id)
        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.fullName, location: userProfile.location, bio: userProfile.bio})
        
    } catch (error) {
        res.status(400).send('Error updating name')
    }
}

async function getOtherUsers(req, res) {  // gets users other than requester
    try {
        const decodedToken = db.getDecodedTokenFromHeader(req)

        const otherUsers = await db.findOtherUsers(decodedToken.id)
        res.status(200).json({otherUsers})
        
    } catch (error) {
        res.status(400).send('Error fetching other users')
    }
}

async function getUserData(req, res) {
    try {
        const decodedToken = db.getDecodedTokenFromHeader(req) // not used direclty, but used to verify

        const userData = await db.findUserData(req.params.userID)
        res.status(200).json(userData)
        
    } catch (error) {
        res.status(400).send('Error fetching user data')
    }
}

module.exports = {
    getUserProfile,
    updateUserName,
    updateUserLocation,
    updateUserBio,
    getOtherUsers,
    getUserData
}