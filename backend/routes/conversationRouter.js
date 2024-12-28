const express = require("express")
const { getAllConversations, createConversation, sendMessage, getConversation } = require('../controllers/conversationController');  // Import controller functions
const conversationRouter = express.Router();

conversationRouter.get('/all', getAllConversations)
conversationRouter.post('/create', createConversation)
conversationRouter.patch('/sendMessage', sendMessage)
conversationRouter.get('/specific', getConversation)

module.exports = conversationRouter;