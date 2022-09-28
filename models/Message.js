const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})

const Message = new mongoose.model('Message', MessageSchema)

module.exports = Message

