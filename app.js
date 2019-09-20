const express = require('express')
const bodyParser = require('body-parser')
const { validateBody } = require('./validate-body')
const { userExists, createUser } = require('./users')
const { createSession } = require('./sessions')

const app = express()

function createIndexPageLocals({
  user = undefined,
  session = undefined,
  signUpErrors = [],
  loginErrors = [],
}) {
  return {
    user,
    session,
    signUpErrors,
    loginErrors,
  }
}

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index', createIndexPageLocals({}))
})
app.post('/signup', function(req, res) {
  // remember, you'll need body-parser for this
  const newUser = req.body

  // basic validation:
  const errors = validateBody(newUser)
  if (errors.length) {
    return res.render(
      'index',
      createIndexPageLocals({
        signUpErrors: errors,
      }),
    )
  }

  // check for existing user:
  if (userExists(newUser.username)) {
    return res.render('index', {
      signUpErrors: ['User already exists with that username'],
    })
  }

  // we are good to go, create the user
  const user = createUser(newUser)

  // Assuming everything is all good, you'll want to "log in"
  // by creating a session
  const session = createSession(user)

  // Use Set-Cookie to put sessionId on the client as a cookie
  res.set('Set-Cookie', 'my_app_session=' + session.sessionId)
  res.render(
    'index',
    createIndexPageLocals({
      user,
      session,
    }),
  )
})

app.post('/login', function(req, res) {
  // check that username and password match a know user in the users
  // object. If you find one and the password matches, add a new
  // session into the sessions object and use the Set-Cookie header
  // just like in the signup handler
})

module.exports = app
