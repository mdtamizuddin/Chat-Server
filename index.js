const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const Message = require('./models/Message')
var allowlist = ['http://loacalhost:3000', 'https://dado-chat.mdtamiz.xyz/',]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors())
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


app.use('/messages', cors(), require('./Router/messageRouter'))
app.use('/user', cors(), require('./Router/userRouter'))
app.use('/message', cors(), require('./Router/sendMail'))

server.listen(5000, () => {
  console.log("Server Is Running");
})