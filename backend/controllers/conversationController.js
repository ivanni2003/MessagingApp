const db = require("../db/queries")
const {getSocketID, io} = require ("../app.js")
const jwt = require('jsonwebtoken')

async function getProfilesFromConversations(req, res) {
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Invalid Token' })
        }

        const otherProfiles = await db.findOtherUserInfoFromConversations(decodedToken.id)
        res.status(200).json({otherProfiles})
    } catch (error) {
        res.status(400).send('Error getting user conversations')
    }
}

async function createConversation(req, res) {
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET) 
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Invalid Token' })
        }
        const otherUserObj = await db.findUser(req.body.username)  // find other user for conversation

        await db.createConversation(decodedToken.id, otherUserObj.id)
        res.status(200).send('Conversation Created.')
    } catch (error) {
        res.status(400).send('Error getting conversation')
    }
}

async function sendMessage(req, res) {  // sends message & returns updated conversation
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)  // sender token
        if (!(decodedToken.id && decodedToken.username)) {
            return res.status(401).json({ error: 'Invalid Token' })
        }
        const otherUserObj = await db.findUser(req.body.username)  // receiver 

        const conversation = await db.findConversation(decodedToken.id, otherUserObj.id)
        
        if (!conversation) {  // create convo, if doesn't exist
            await db.createConversation(decodedToken.id, otherUserObj.id)
        }
  
        if (!req.body.initial) {
            const receiverSocketID = getSocketID(otherUserObj.id)
            if (receiverSocketID) {
                const newMessage = {
                    sender: decodedToken.username,
                    message: req.body.message
                }
                io.to(receiverSocketID).emit("appendMessage", newMessage)
                console.log('sent')
            }
        }

        await db.appendMessage(decodedToken.username, decodedToken.id, otherUserObj.id, req.body.message)

        const updatedConversation = await db.findConversation(decodedToken.id, otherUserObj.id)
        res.status(200).json({updatedConversation})
    } catch (error) {
        res.status(400).send('Error sending message' + error)
    }
}


async function getConversation(req, res) {
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)  // sender token
        if (!(decodedToken.id && decodedToken.username)) {
            return res.status(401).json({ error: 'Invalid Token' })
        }
        const otherUserObj = await db.findUser(req.params.username)  // find other user in conversation

        const conversation = await db.findConversation(decodedToken.id, otherUserObj.id)
        res.status(200).json(conversation)
    } catch (error) {
        res.status(400).send('Error getting conversation')
    }
}

module.exports = {
    getProfilesFromConversations,
    createConversation,
    sendMessage,
    getConversation
}