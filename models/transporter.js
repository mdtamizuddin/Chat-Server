const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.mdtamiz.xyz",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "web@mdtamiz.xyz",
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});
// transporter.verify(function (error, success) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// });


module.exports = transporter;
