const db = require("../db/queries");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function createAccount(req, res) {
    const existingUserObj = await db.findUser(req.body.username)

    if (existingUserObj) { // username already exists
        return res.status(401).json({ error: 'Username already exists'})
    }

    const userObj = await db.createUser(req.body.username, req.body.password)

    const userForToken = {
        id: userObj.id,
        username: userObj.username
    }

    const userToken = jwt.sign(userForToken, process.env.SECRET)
    res.status(201).send({userToken, id: userObj.id, username: userObj.username});
}

async function login(req, res) {
    const userObj = await db.findUser(req.body.username)

    if (!userObj) {  // wrong username
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

    const correctPassword = await bcrypt.compare(req.body.password, userObj.password_hash)

    if (!(userObj && correctPassword)) {  // wrong password
        return res.status(401).json({ error: 'Invalid username or password.' })
    }

    const userForToken = {
        id: userObj.id,
        username: userObj.username
    }

    const userToken = jwt.sign(userForToken, process.env.SECRET)

    res.status(201).json({userToken, id: userObj.id, username: userObj.username});
}

module.exports = {
    createAccount,
    login
}