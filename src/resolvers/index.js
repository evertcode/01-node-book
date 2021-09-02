const resolvers = {
  Query: {
    hello: () => 'hello, world!',
    greet: (_, { name }) => `Hello ${name}`,
  },
}

module.exports = { resolvers }
