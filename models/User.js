const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    verifyed: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})
const User = new mongoose.model('User', UserSchema)

module.exports = User