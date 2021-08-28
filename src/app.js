require('dotenv').config()
require('./mongodb')

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

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

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => console.log('hello world'),
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
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
