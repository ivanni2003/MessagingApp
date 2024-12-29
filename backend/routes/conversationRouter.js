const express = require("express")
const { getProfilesFromConversations, createConversation, sendMessage, getConversation } = require('../controllers/conversationController');  // Import controller functions
const conversationRouter = express.Router();

conversationRouter.get('/other', getProfilesFromConversations)
conversationRouter.post('/create', createConversation)
conversationRouter.patch('/sendMessage', sendMessage)
conversationRouter.get('/specific/:username', getConversation)

module.exports = conversationRouter;