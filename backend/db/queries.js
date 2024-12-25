const pool = require("./pool");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username", [username, passwordHash])

    const userObj = result.rows[0]

    const userForToken = {
        id: userObj.id,
        username: userObj.username
    }

    const userToken = jwt.sign(userForToken, process.env.SECRET)

    return {userToken, id: userObj.id, username: userObj.username}
}

async function findUser(username, password) {
    const result = await pool.query("SELECT DISTINCT * FROM users WHERE username = $1", [username])

    const userObj = result.rows[0]
    const correctPassword = await bcrypt.compare(password, result.rows[0].password_hash)

    if (!(userObj || correctPassword)) {
        //return wrong username/password
    }

    const userForToken = {
        id: userObj.id,
        username: userObj.username
    }

    const userToken = jwt.sign(userForToken, process.env.SECRET)

    return {userToken, id: userObj.id, username: userObj.username}
}
  
module.exports = {
    createUser,
    findUser
};