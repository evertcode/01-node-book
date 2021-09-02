const Book = require('../model/Book')

// Get all list of books from the database
const getAll = (req, res) => {
  Book.find({}).then((books) => {
    res.json(books)
  })
}

// Get book by id from the databases
const getById = (req, res, next) => {
  const { id } = req.params

  Book.findById(id)
    .then((book) => {
      book && res.json(book)

      res.status(404).end()
    })
    .catch((err) => next(err))
}

// Delete book by id
const deleteById = (req, res, next) => {
  const { id } = req.params

  Book.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(next)
}

// Create a new Book in the  databases
const createBook = (req, res, next) => {
  const { isbn, title, author, summary, image, price } = req.body

  !isbn &&
    !title &&
    !summary &&
    res.status(400).json({ error: 'required object book is missing' })

  const newBook = new Book({
    isbn,
    title,
    author,
    summary,
    image,
    price,
  })

  newBook
    .save()
    .then((savedBook) => {
      res.json(savedBook)
    })
    .catch((err) => next(err))
}

// Update the book by idss
const updateBook = (req, res, next) => {
  const { id } = req.params
  const { isbn, title, author, summary, image, price } = req.body

  const newBookInfo = {
    isbn,
    title,
    author,
    summary,
    image,
    price,
  }

  Book.findByIdAndUpdate(id, newBookInfo, { new: true })
    .then((book) => res.json(book))
    .catch(next)
}

module.exports = { getAll, getById, deleteById, createBook, updateBook }
