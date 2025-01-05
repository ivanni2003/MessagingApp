const pool = require("./pool");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function getDecodedTokenFromHeader(req) {  
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(authorization.replace('Bearer ', ''), process.env.SECRET)
        
        if (!decodedToken.id || !decodedToken.username) {
            return res.status(401).json({ error: 'Invalid Token' })
        }
        return decodedToken
    }
    return null
}

// user table
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query(`INSERT INTO users (username, "passwordHash") VALUES ($1, $2) RETURNING id, username`, [username, passwordHash])

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
async function createProfile(userID) {
    await pool.query(`INSERT INTO profiles ("userID", "fullName", location, bio) VALUES ($1, '', '', '')`, [userID])
}

async function deleteProfile(userID) {
    await pool.query(`DELETE FROM profiles WHERE "userID" = $1`, [userID])
}

async function getProfile(userID) {   
    const result = await pool.query(`SELECT DISTINCT * FROM profiles WHERE "userID" = $1`, [userID])

    return result.rows[0]
}

async function updateName(newName, userID) {  
    await pool.query(`UPDATE profiles SET "fullName" = $1 WHERE "userID" = $2`, [newName, userID])
}

async function updateLocation(newLocation, userID) {    
    await pool.query(`UPDATE profiles SET location = $1 WHERE "userID" = $2`, [newLocation, userID])
}

async function updateBio(newBio, userID) {   
    await pool.query(`UPDATE profiles SET bio = $1 WHERE "userID" = $2`, [newBio, userID])
}

async function findOtherUsers(userID) {  // user & profile data for all users that are not user_id
    const result = await pool.query(`SELECT "userID", username, "fullName", location, bio FROM profiles INNER JOIN users ON "userID" = id WHERE "userID" != $1`, [userID])
    return result.rows
}

async function findUserData(userID) {   // user & profile data for user_id
    const result= await pool.query(`SELECT "userID", username, "fullName", location, bio FROM profiles INNER JOIN users ON "userID" = id WHERE "userID" = $1`, [userID])
    return result.rows
}

// conversations table
async function findOtherUserInfoFromConversations(userID) {  // all conversations of user
    const result = await pool.query(`SELECT DISTINCT "userID", username, "fullName", location, bio FROM users INNER JOIN profiles ON id = "userID" INNER JOIN conversations ON ("userID1" = "userID" OR "userID2" = "userID") WHERE ("userID" != $1) AND ("userID1" = $1 OR "userID2" = $1)`, [userID])
    return result.rows
}

async function createConversation(userID1, userID2) {  // creates conversation (empty delete & conversations)
    await pool.query(`INSERT INTO conversations ("userID1", "userID2", messages) VALUES ($1, $2, '{}'::jsonb[])`, [userID1, userID2])
}

async function appendMessage(senderName, userID1, userID2, message) {    // sends message in existing conversation
    const newMessage = {
        sender: senderName,
        message: message
    }
    await pool.query(`UPDATE conversations SET messages = array_append(messages, $1::jsonb) WHERE ("userID1" = $2 and "userID2" = $3) or ("userID1" = $3 and "userID2" = $2)`, [JSON.stringify(newMessage), userID1, userID2])
}

async function findConversation(userID1, userID2) {    
    const result = await pool.query(`SELECT * FROM conversations WHERE ("userID1" = $1 and "userID2" = $2) or ("userID1" = $2 and "userID2" = $1)`, [userID1, userID2])
    return result.rows[0]
}
  
module.exports = {
    getDecodedTokenFromHeader,
    createUser,
    findUser,
    deleteUser,
    createProfile,
    deleteProfile,
    getProfile,
    updateName,
    updateLocation,
    updateBio,
    findOtherUsers,
    findUserData,
    findOtherUserInfoFromConversations,
    createConversation,
    appendMessage,
    findConversation
};