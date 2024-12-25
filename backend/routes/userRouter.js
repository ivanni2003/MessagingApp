const express = require("express")
const { createAccount, login } = require('../controllers/userController');  // Import controller functions
const userRouter = express.Router();

userRouter.post('/register', createAccount)
userRouter.post('/login', login)

module.exports = userRouter;