import mongoose, { ConnectionOptions } from 'mongoose'
import config from './config/config'
;(async () => {
  try {
    const connectionOptions: ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: false,
      useFindAndModify: false,
    }

    // Database for production
    let dbURL = `mongodb+srv://${config.DB.MONGO_USER}:${config.DB.MONGO_PASSWORD}@${config.DB.MONGO_HOST}/${config.DB.MONGO_DB}?retryWrites=true&w=majority`

    // Database for development
    dbURL = `mongodb://${config.DB.MONGO_HOST}/${config.DB.MONGO_DB}`

    const db = await mongoose.connect(dbURL, connectionOptions)

    console.log(`DB is connected to: ${db.connection.name}`)
  } catch (error) {
    console.log(error)
  }
})()
