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

async function getProfile(user_id) {   
    const result = await pool.query("SELECT DISTINCT * FROM profiles WHERE user_id = $1", [user_id])

    return result.rows[0]
}

async function updateName(newName, user_id) {  
    await pool.query("UPDATE profiles SET full_name = $1 WHERE user_id = $2", [newName, user_id])
}

async function updateLocation(newLocation, user_id) {    
    await pool.query("UPDATE profiles SET location = $1 WHERE user_id = $2", [newLocation, user_id])
}

async function updateBio(newBio, user_id) {   
    await pool.query("UPDATE profiles SET bio = $1 WHERE user_id = $2", [newBio, user_id])
}

async function findOtherUsers(user_id) {  // user & profile data for all users that are not user_id
    const result = await pool.query("SELECT user_id, username, full_name, location, bio FROM profiles INNER JOIN users ON user_id = id WHERE user_id != $1", [user_id])
    return result.rows
}

async function findUserData(user_id) {   // user & profile data for user_id
    const result= await pool.query("SELECT user_id, username, full_name, location, bio FROM profiles INNER JOIN users ON user_id = id WHERE user_id = $1", [user_id])
    return result.rows
}

// conversations table
async function findOtherUserInfoFromConversations(user_id) {  // all conversations of user
    const result = await pool.query("SELECT DISTINCT user_id, username, full_name, location, bio FROM users INNER JOIN profiles ON id = user_id JOIN conversations ON user_id1 = $1 OR user_id2 = $1 WHERE id != $1", [user_id])
    return result.rows
}

async function createConversation(user_id1, user_id2) {  // creates conversation (empty delete & conversations)
    await pool.query("INSERT INTO conversations (user_id1, user_id2, deleted_by, messages) VALUES ($1, $2, '{}', '{}'::jsonb[])", [user_id1, user_id2])
}

async function appendMessage(sender_name, user_id1, user_id2, message) {    // sends message in existing conversation
    const newMessage = {
        sender: sender_name,
        message: message
    }
    await pool.query("UPDATE conversations SET messages = array_append(messages, $1::jsonb) WHERE (user_id1 = $2 and user_id2 = $3) or (user_id1 = $3 and user_id2 = $2)", [JSON.stringify(newMessage), user_id1, user_id2])
}

async function findConversation(user_id1, user_id2) {    
    const result = await pool.query("SELECT * FROM conversations WHERE (user_id1 = $1 and user_id2 = $2) or (user_id1 = $2 and user_id2 = $1)", [user_id1, user_id2])
    return result.rows[0]
}

async function deleteConversation(user_id) {   // delete on one user's end

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
    updateBio,
    findOtherUsers,
    findUserData,
    findOtherUserInfoFromConversations,
    createConversation,
    appendMessage,
    findConversation,
    deleteConversation
};