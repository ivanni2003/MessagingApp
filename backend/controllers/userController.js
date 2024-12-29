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

    const userToken = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 3600 })

    db.createProfile(userObj.id)

    res.status(201).send({userToken, username: userObj.username, userID: userObj.id});
}

async function login(req, res) {
    try {
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

    const userToken = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 3600 })

    res.status(200).json({userToken, username: userObj.username, userID: userObj.id})
    } catch (error) {
        res.status(400).send(error)
    }
    
}

async function deleteAccount(req, res) {
    try {
        const decodedToken = jwt.verify(db.getTokenFromHeader(req), process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Invalid Token' })
        }

        await db.deleteUser(decodedToken.id)
        await db.deleteProfile(decodedToken.id)
        res.status(201).send('Account Deleted')
    } catch (error) {
        res.status(400).send(error)
    }
    
}

module.exports = {
    createAccount,
    login,
    deleteAccount
}