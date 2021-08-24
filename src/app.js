const express = require('express')
const app = express()
const morgan = require('morgan')

// Import routes from bookstore
const bookstore = require('./routes/bookstore')

const PORT = process.env.PORT || 3000

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

// API home page
app.get('/', (req, res) => {
  res.status(200).send('Welcome to bookstore API RESTful')
})

// route to /api/v1/book
app.route('/api/v1/book').get(bookstore.getBooks).post(bookstore.postBook)

// route to /api/v1/book/:id
app
  .route('/api/v1/book/:id')
  .get(bookstore.getBook)
  .patch(bookstore.updateBook)
  .delete(bookstore.deleteBook)

// Started the server.
app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
  console.log('Press ctrl + c to exit.')
})

// Export module for testing purposes
module.exports = app
