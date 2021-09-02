const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
  isbn: Number,
  title: String,
  author: String,
  summary: String,
  image: String,
  price: {
    currency: String,
    value: Number,
    display: {
      value: String,
    },
  },
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Book = model('Book', bookSchema)

module.exports = Book
