const nodemailer = require('nodemailer');
const transporter = require('../models/transporter');
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    const user = req.body
    const sentEmail = () => {
        async function main() {
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"User Verification Code" <tamiz@mdtamiz.xyz>', // sender address
                to: user.email, // list of receivers
                subject: "Md Tamiz User Verificition Code ✔", // Subject line
                text: "Md Tamiz User Verificition Code", // plain text body
                html: `
            <div>
                <h3>Verify Your Account with This Code</h3>
                <p>Code : ${user.code}</p>
            </div> 
            `,
            });

            console.log("Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        main().catch(console.error);
    };
    sentEmail()
    res.send(user.email)
})
module.exports = router