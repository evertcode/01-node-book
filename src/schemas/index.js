const { makeExecutableSchema } = require('@graphql-tools/schema')
const { resolvers } = require('../resolvers')

const typeDefs = `
  type Query {
    hello: String!
    greet(name: String!): String!
  }
`

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
})

module.exports = schema
