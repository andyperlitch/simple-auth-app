const { hashPassword } = require('./password-utils')

const users = {}

function userExists(username) {
  return users.hasOwnProperty(username)
}

function createUser({ username, password }) {
  users[username] = {
    username,
    passwordHash: hashPassword(password),
    createdAt: new Date(),
  }
}

module.exports = {
  userExists,
  createUser,
}
