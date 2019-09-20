const { MIN_USERNAME_LENGTH, MIN_PASSWORD_LENGTH } = require('./consts')

function validateBody(body) {
  // extract values from the body
  const { username, password, password_confirm } = body
  const errors = []

  // you'll need to do some validation here, like:
  //   - is the username field empty?
  const trimmedUsername = username.trim()
  if (trimmedUsername === '') {
    errors.push('Username required.')
  }
  if (trimmedUsername.length < MIN_USERNAME_LENGTH) {
    errors.push(`Username must be at least ${MIN_USERNAME_LENGTH} characters long.`)
  }
  //   - is either password field empty?
  if (password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be ${MIN_PASSWORD_LENGTH} characters long.`)
  }
  //   - do the two password fields match?
  if (password !== password_confirm) {
    errors.push(`Passwords do not match.`)
  }
  return errors
}

module.exports = {
  validateBody,
}
