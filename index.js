const app = require('./app')
const port = process.env.PORT || 45874
console.log(`Server listening. Go to http://localhost:${port}`)
app.listen(port)
