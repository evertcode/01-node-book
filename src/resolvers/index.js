const Book = require('../models/Book')

const resolvers = {
  Query: {
    hello: () => 'hello, world!',
    greet: (_, { name }) => `Hello ${name}`,
    async books() {
      return await Book.find({})
    },
  },

  Mutation: {
    createBook: async (_, { book }) => {
      const {
        isbn,
        title,
        author,
        summary,
        image,
        price: { currency, value, display },
      } = book

      const newBook = new Book({
        isbn,
        title,
        author,
        summary,
        image,
        price: {
          currency,
          value,
          display: {
            value: display.value,
          },
        },
      })

      await newBook.save()

      return newBook
    },
    async deleteBook(_, { id }) {
      return await Book.findByIdAndDelete(id)
    },
  },
}

module.exports = { resolvers }
