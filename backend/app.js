const express = require("express")
const app = express()
const db = require("./db/queries");

app.use(express.json());
require("dotenv").config()

app.get("/", async (req, res) => {
    const rows = await db.getAllUsernames();
    console.log(rows)
})

app.post("/new", async (req, res) => {
    db.insertUsername(req.body.username)
    res.send(req.body.username)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
