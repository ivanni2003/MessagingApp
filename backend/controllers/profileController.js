const db = require("../db/queries");
const jwt = require('jsonwebtoken')

async function getUserProfile(req, res) { // note send entire user obj in body (for token)
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Invalid Token' })
        }

        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.full_name, location: userProfile.location, bio: userProfile.bio})
    } catch (error) {
        res.status(400).send('Error getting user profile data')
    }
}

async function updateUserName(req, res) {  // updates & sends updated profile
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Invalid Token' })
        }

        await db.updateName(req.body.newName, decodedToken.id)
        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.full_name, location: userProfile.location, bio: userProfile.bio})
        
    } catch (error) {
        res.status(400).send('Error updating name')
    }
}

async function updateUserLocation(req, res) {  // updates & sends updated profile
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Invalid Token' })
        }

        await db.updateLocation(req.body.newLocation, decodedToken.id)
        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.full_name, location: userProfile.location, bio: userProfile.bio})
        
    } catch (error) {
        res.status(400).send('Error updating name')
    }
}

async function updateUserBio(req, res) {  // updates & sends updated profile
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Invalid Token' })
        }

        await db.updateBio(req.body.newBio, decodedToken.id)
        const userProfile = await db.getProfile(decodedToken.id)
        res.status(200).json({fullName: userProfile.full_name, location: userProfile.location, bio: userProfile.bio})
        
    } catch (error) {
        res.status(400).send('Error updating name')
    }
}

async function getOtherUsers(req, res) {  // gets users other than requester
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Invalid Token' })
        }
        const otherUsers = await db.findOtherUsers(decodedToken.id)
        res.status(200).json({otherUsers})
        
    } catch (error) {
        res.status(400).send('Error fetching other users')
    }
}

module.exports = {
    getUserProfile,
    updateUserName,
    updateUserLocation,
    updateUserBio,
    getOtherUsers
}