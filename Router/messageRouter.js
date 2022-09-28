const express = require('express')
const Message = require('../models/Message')

const router = express.Router()

router.get('/', (req, res) => {
    Message.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Something Went to wrong on Seerver" })
        }
        else {
            res.status(200).send(data)
        }
    })
})

module.exports = router
