const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')

app.use(bodyParser.json())
app.use(cors())
require('dotenv').config()
const server = http.createServer(app)

app.get('/api/', (req, res) => {
  res.send({ message: "This Is Api Route" })
})
const uri = process.env.DB_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database Is Connected'))
  .catch((err) => console.log(err))


app.use('/messages', require('./Router/messageRouter'))
app.use('/user', require('./Router/userRouter'))
app.use('/message', require('./Router/sendMail'))

server.listen(5000, () => {
  console.log("Server Is Running");
})