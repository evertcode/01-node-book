const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

!connectionString && console.error('MONGO_DB_UIR no existe.')

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.error(err)
  })

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
