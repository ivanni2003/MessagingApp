const { Client } = require('pg')
require("dotenv").config()

const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
	    id SERIAL PRIMARY KEY,
	    username VARCHAR (255) UNIQUE,
	    "passwordHash" VARCHAR (255)
    )
`

const createProfileTable = `
    CREATE TABLE IF NOT EXISTS profiles (
	"userID" INTEGER,
	"fullName" VARCHAR (255),
	location VARCHAR (255),
    bio VARCHAR (255)
    )
`

const createConversationTable = `
    CREATE TABLE IF NOT EXISTS conversations (
        "userID1" INTEGER,
        "userID2" INTEGER,
        messages JSONB[] DEFAULT '{}'
    )
`

async function main() {
    const client = new Client({
        host: "localhost", 
        user: process.env.ROLE_NAME,
        database: process.env.DB_NAME,
        password: process.env.PASSWORD,
        port: 5432
    })

    await client.connect()
    
    await client.query(createUserTable)
    console.log('users table created')

    await client.query(createProfileTable)
    console.log('profile table created')
    
    await client.query(createConversationTable)
    console.log('conversation table created')

    await client.end()
}

main()