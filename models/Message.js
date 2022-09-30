const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    users: {
        type: String,
        required: true,
    },
    messages: {
        type: Array,
        default: []
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

