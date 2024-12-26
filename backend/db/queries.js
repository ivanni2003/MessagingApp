const pool = require("./pool");

const bcrypt = require('bcrypt')

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username", [username, passwordHash])

    return result.rows[0]
}

async function findUser(username) {
    const result = await pool.query("SELECT DISTINCT * FROM users WHERE username = $1", [username])

    return result.rows[0]
}
  
module.exports = {
    createUser,
    findUser
};