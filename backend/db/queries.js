const pool = require("./pool");

const bcrypt = require('bcrypt')

function getTokenFromHeader(req) {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

// user table
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username", [username, passwordHash])

    return result.rows[0]
}

async function findUser(username) {
    const result = await pool.query("SELECT DISTINCT * FROM users WHERE username = $1", [username])

    return result.rows[0]
}

async function deleteUser(id) {
    await pool.query("DELETE FROM users WHERE id = $1", [id])
}

// profile table
async function createProfile(user_id) {
    await pool.query("INSERT INTO profiles (user_id, full_name, location, bio) VALUES ($1, '', '', '')", [user_id])
}

async function deleteProfile(user_id) {
    await pool.query("DELETE FROM profiles WHERE user_id = $1", [user_id])
}

async function getProfile(user_id) {    // pass in token if needed
    const result = await pool.query("SELECT DISTINCT * FROM profiles WHERE user_id = $1", [user_id])

    return result.rows[0]
}

async function updateName(newName, user_id) {   // pass in token if needed
    await pool.query("UPDATE profiles SET full_name = $1 WHERE user_id = $2", [newName, user_id])
}

async function updateLocation(newLocation, user_id) {    // pass in token if needed
    await pool.query("UPDATE profiles SET location = $1 WHERE user_id = $2", [newLocation, user_id])
}

async function updateBio(newBio, user_id) {   // pass in token if needed
    await pool.query("UPDATE profiles SET bio = $1 WHERE user_id = $2", [newBio, user_id])
}
  
module.exports = {
    getTokenFromHeader,
    createUser,
    findUser,
    deleteUser,
    createProfile,
    deleteProfile,
    getProfile,
    updateName,
    updateLocation,
    updateBio
};