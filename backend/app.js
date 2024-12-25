const express = require("express")
const app = express()
const cors = require('cors')
require("dotenv").config()

const userRouter = require('./routes/userRouter')

app.use(cors())
app.use(express.json());

app.use('/api/users', userRouter)


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
