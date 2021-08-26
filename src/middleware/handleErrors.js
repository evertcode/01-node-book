module.exports = (error, req, res, next) => {
  console.error(error)

  error.name === 'CastError' &&
    res.status(400).send({ error: 'id used is malformed' })

  res.status(500).end()
}
