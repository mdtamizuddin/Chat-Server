const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const Message = require('./models/Message')

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://dado-chat.mdtamiz.xyz",
    "http://192.168.0.106:3000/login"
  ],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
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

const users = {}

const io = new Server(server)

io.on("connection", (socket) => {
  socket.on('new_user', (email) => {
    users[socket.id] = email
    socket.broadcast.emit("new_connection", email)
  })
  socket.on("send_message", (data) => {
    const newMessage = new Message(data)
    newMessage.save((err) => {
      if (err) {
        console.log('Something went Wrong')
      }
      else {
        socket.broadcast.emit("recive_message", data)
      }
    })

  })
})


app.use('/messages', require('./Router/messageRouter'))
app.use('/user', require('./Router/userRouter'))
app.use('/message', require('./Router/sendMail'))

server.listen(5000, () => {
  console.log("Server Is Running");
})