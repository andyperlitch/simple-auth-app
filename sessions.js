const sessions = {}
const usersToSessionIds = {}

function createSessionId() {
  return `session-${Math.random()}`
}

/**
 * Creates a session and returns the session. If a session already exists
 * for a user, return the existing session.
 * @param {object} user The user to create a session for
 */
function createSession(user) {
  // check for existing session
  const existingSessionId = usersToSessionIds[user.username]
  if (existingSessionId && sessions[existingSessionId]) {
    return sessions[existingSessionId]
  }

  const sessionId = createSessionId()
  const session = (sessions[sessionId] = {
    loginTime: new Date(),
    username: user.username,
    sessionId,
  })
  usersToSessionIds[user.username] = sessionId
  return session
}

module.exports = {
  createSession,
}
