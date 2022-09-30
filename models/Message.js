const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: ''
    },
    to: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

const Message = new mongoose.model('Message', MessageSchema)

module.exports = Message

