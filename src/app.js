require('dotenv').config()
require('./mongodb')

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schemas')

const bookRoutes = require('./routes/book')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const PORT = process.env.PORT || 4000

// cors middleware
app.use(cors())

// Morgan middleware
app.use(morgan('dev'))

// Express json middleware
app.use(express.json())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

// API home page
app.get('/bookstore/', (req, res) => {
  console.log(req.ip)
  console.log(req.ips)
  console.log(req.originalUrl)
  res.status(200).send('Welcome to bookstore API RESTful')
})

// route to /api/v1/book
app
  .route('/bookstore/api/v1/book')
  .get(bookRoutes.getAll)
  .post(bookRoutes.createBook)

// route to /api/v1/book/:id
app
  .route('/bookstore/api/v1/book/:id')
  .get(bookRoutes.getById)
  .patch(bookRoutes.updateBook)
  .delete(bookRoutes.deleteById)

app.use(notFound)
app.use(handleErrors)

// Started the server.
const server = app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
  console.log('Press ctrl + c to exit.')
})

// Export module for testing purposes
module.exports = { server, app }
