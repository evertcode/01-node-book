require('dotenv').config()
require('./mongodb')

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// Import routes from bookstore
// const bookstore = require('./routes/bookstore')
const bookstore = require('./routes/book')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const PORT = process.env.PORT || 4000

// cors middleware
app.use(cors())

// Morgan middleware
app.use(morgan('combined'))

// Express json middleware
app.use(express.json())

// default middleware options
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type,Accept,X-Access-Token,X-Key'
  )

  req.method === 'OPTIONS' && res.status(200).end()

  next()
})

app.get('/', (req, res) => {
  console.log(req.ip)
  console.log(req.ips)
  console.log(req.originalUrl)
  res.send('<h1>Hello World!</h1>')
})

// API home page
app.get('/', (req, res) => {
  res.status(200).send('Welcome to bookstore API RESTful')
})

// route to /api/v1/book
app.route('/api/v1/book').get(bookstore.getAll).post(bookstore.createBook)

// route to /api/v1/book/:id
app
  .route('/api/v1/book/:id')
  .get(bookstore.getById)
  .patch(bookstore.updateBook)
  .delete(bookstore.deleteById)

app.use(notFound)
app.use(handleErrors)

// Started the server.
const server = app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
  console.log('Press ctrl + c to exit.')
})

// Export module for testing purposes
module.exports = { server, app }
