const express = require("express")
const cors = require('cors')
require("dotenv").config()

const { Server } = require('socket.io')
const http = require("http")

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

const activeUserMap = {}

const getSocketID = (userID) => activeUserMap[userID]

module.exports = {
  getSocketID,
  io
}

io.on("connection", (socket) => {
  const userID = socket.handshake.query.userID

  activeUserMap[userID] = socket.id

  io.emit("getActiveUsers", Object.keys(activeUserMap))

  socket.on("disconnect", () => {
    delete activeUserMap[userID]
    io.emit("getActiveUsers", Object.keys(activeUserMap))
  })
})

const userRouter = require('./routes/userRouter')
const profileRouter = require('./routes/profileRouter')
const conversationRouter = require('./routes/conversationRouter')

app.use(cors())
app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/profiles', profileRouter)
app.use('/api/conversations', conversationRouter)


const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})