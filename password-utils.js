const bcrypt = require('bcrypt')
const saltRounds = 10

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds)
}

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  hashPassword,
  checkPassword,
}
