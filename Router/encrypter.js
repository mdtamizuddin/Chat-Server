const encryptPassword = require('encrypt-password')


const encrypter = (password, sign) => {
    encryptPassword.secret = 'Hello Mothe****'
    encryptPassword.min = 6
    encryptPassword.max = 24
    const encryptedPassword = encryptPassword(password, sign)
    return encryptedPassword
}

module.exports = encrypter