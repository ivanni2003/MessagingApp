const express = require("express")
const { createAccount, login, deleteAccount } = require('../controllers/userController');  // Import controller functions
const userRouter = express.Router();

userRouter.post('/register', createAccount)
userRouter.post('/login', login)
userRouter.delete('/delete/:id', deleteAccount)

module.exports = userRouter;