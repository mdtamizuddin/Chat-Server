const express = require('express')
const transporter = require('../models/transporter')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const encrypter = require('./encrypter')

const router = express.Router()

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Something Went to wrong on Seerver" })
        }
        else {
            res.status(200).send(data)
        }
    })
})
router.get('/:email', (req, res) => {
    User.findOne({ email: req.params.email }, (err, data) => {
        if (data) {
            res.status(200).send({ email: data.email, name: data.name, verifyed: data.verifyed })
        }
        else {
            res.status(500).send({ message: "Something Went to wrong on Seerver" })
        }
    })
})
router.get('/check/:email', (req, res) => {
    User.findOne({ email: req.params.email }, (err, data) => {
        if (!data) {
            res.send("Invalid User")
        }
        else {
            res.send({
                message: "Wellcome", email: data.email, name: data.name,
                verifyed: data.verifyed
            })
        }
    })
})
router.post('/new', (req, res) => {
    const body = req.body
    const email = body.email
    User.findOne({ email: email }, (err, data) => {
        if (data?.email) {
            res.send({ message: "Email Alrady Registerd" })
        }
        else {
            const name = body.name
            const code = Math.floor((Math.random() * 156514) + 1)
            const password = encrypter(body.password, email)
            const newUser = new User({ name, email, password, date: body.date, code })
            newUser.save((err) => {
                if (err) {
                    res.status(500).send(err)
                    console.log(err)
                }
                else {
                    sentEmail(newUser)
                    token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
                    res.status(200).json({ message: `Wellcome ${email}`, token: token })
                }
            })
        }
    })

})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = encrypter(req.body.password, email)
    User.findOne({ email: email }, (err, data) => {
        if (err) {
            res.status(500).send({ message: "something went wrong" })
        }
        else {
            if (data) {
                if (password === data.password) {
                    token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
                    res.send({ message: "wellcome Back", token })
                } else {
                    res.send({ message: "Incorrect Password" })
                }
            }
            else {
                res.send({ message: "User Not Found" })
            }
        }
    })
})
router.post('/resend/:email', (req, res) => {
    const email = req.params.email
    User.findOne({ email: email }, (err, data) => {
        if (err) {
            res.send({ message: "Something went Wrong" })
        }
        else {
            sentEmail(data)
            res.status(200).send({ message: "Resend Mail Success" })
        }
    })

})
router.put('/veirfy/:email', (req, res) => {
    const code = req.body.post
    User.updateOne({ email: req.params.email }, {
        $set: {
            code: code
        }
    }, (err) => {
        if (err) {
            res.status(500).send({ message: "Something Went Wrong" })
        }
        else {
            res.status(200).send({ message: "" })
        }
    })
})

module.exports = router

const sentEmail = (user) => {
    async function main() {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Recived Mail From Md Tamiz 👍" <tamiz@mdtamiz.xyz>', // sender address
            to: user.email, // list of receivers
            subject: "Md Tamiz User Verificition Code ✔", // Subject line
            text: "Md Tamiz User Verificition Code", // plain text body
            html: `
        <div>
            <h3>Verify Your Account with This Code</h3>
            <h4>Code : ${user.code}</h4>
            <p> Thank You 👋</p>
        </div> 
        `,
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);
};

