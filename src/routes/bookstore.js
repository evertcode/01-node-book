const { v4: uuidv4 } = require('uuid')
const { books } = require('../data')

const findById = (id) => books().find((book) => book.id === id)

const getBooks = (req, res) => {
  res.status(200).json(books())
}

const postBook = (req, res) => {
  const { isbn, title, author, summary, image, price } = req.body

  const newBook = {
    id: uuidv4(),
    isbn,
    title,
    author,
    summary,
    image,
    price,
  }

  books().push(newBook)

  res.status(201).json(newBook)
}

const getBook = (req, res) => {
  const { id } = req.params
  const book = findById(id)

  !book && res.status(404).end()

  res.status(200).json(book)
}

const updateBook = (req, res) => {
  const { id } = req.params
  const { title, author, summary, image, price } = req.body

  const book = findById(id)

  book.title = title
  book.summary = summary
  book.author = author
  book.image = image
  book.price = price

  res.status(200).json(book)
}

const deleteBook = (req, res) => {
  const { id } = req.params
  const book = findById(id)

  !book && res.status(404).end()

  const idx = books().findIndex((item) => item.id === id)

  books().splice(idx, 1)

  res.status(200).json(book)
}

module.exports = { getBooks, postBook, getBook, updateBook, deleteBook }
