const { makeExecutableSchema } = require('@graphql-tools/schema')
const { resolvers } = require('../resolvers')

const typeDefs = `
  type Query {
    hello: String!
    greet(name: String!): String!
  }

  type Mutation {
    createBook(book: InputBook!): Book
  }

  input InputBook {
    isbn: String!
    title: String
    author: String!
    summary: String!
    image: String!
    price: InputPrice!
  }

  input InputPrice {
    current: String!
    value: Float!
    display: InputDisplay!
  }

  input InputDisplay {
    value: String!
  }

  type Book {
    id: ID!
    isbn: String!
    title: String
    author: String!
    summary: String!
    image: String!
    price: Price!
  }

  type Price {
    current: String!
    value: Float!
    display: Display!
  }

  type Display {
    value: String!
  }
`

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
})

module.exports = schema
