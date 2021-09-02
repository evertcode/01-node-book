const resolvers = {
  Query: {
    hello: () => 'hello, world!',
    greet: (_, { name }) => `Hello ${name}`,
  },

  Mutation: {
    createBook: (_, { book }) => {
      console.log(_, book)
    },
  },
}

module.exports = { resolvers }
