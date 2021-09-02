const mongoose = require('mongoose')

const { MONGO_DB_URI } = process.env

// comment for students puposes
if (!MONGO_DB_URI) {
  console.error('MONGO_DB_URI not found.')
}

mongoose.Promise = global.Promise

// conexión a mongodb
mongoose
  .connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongoose is connected'))
  .catch((err) => console.error(err))

process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}`)
  console.error(`Exception origin: ${origin}`)
  mongoose.disconnect()
})
