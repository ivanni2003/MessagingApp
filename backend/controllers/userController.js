const db = require("../db/queries");

async function createAccount(req, res) {
    const {userToken, id, username} = await db.createUser(req.body.username, req.body.password)
    res.status(200).send({userToken, id, username});
}

async function login(req, res) {
    const {userToken, id, username} = await db.findUser(req.body.username, req.body.password)
    res.status(200).json({userToken, id, username});
}

module.exports = {
    createAccount,
    login
}