const express = require('express')
const Message = require('../models/Message')

const router = express.Router()
router.get('/:email', (req, res) => {
    const email = req.params.email
    Message.find({ $or: [{ from: email }, { to: email }] }, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Something Went to wrong on Seerver" })
        }
        else {
            const newData = data.reverse()
            res.status(200).send(newData)
        }
    })
})
router.get('/all', (req, res) => {
    Message.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Something Went to wrong on Seerver" })
        }
        else {
            res.status(200).send(data)
        }
    })
})
router.post('/new', (req, res) => {
    const newMessage = new Message(req.body)
    newMessage.save((err, data) => {
        if (err) {
            res.send({ message: "something went wrong" })
        }
        else {
            res.send(data)
        }
    })
})
router.delete('/:id', (req, res) => {
    Message.updateOne({ _id: req.params.id }, {
        $set: {
            deleted: true
        }
    }, (err) => {
        if (err) {
            res.status(500).send({ message: "Something went wrong" })
        }
        else {
            res.send({ message: "Message Deleted" })
        }
    })
})


module.exports = router
