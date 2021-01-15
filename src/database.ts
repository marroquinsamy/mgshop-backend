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

    const db = await mongoose.connect(
      `mongodb+srv://${config.DB.MONGO_USER}:${config.DB.MONGO_PASSWORD}@${config.DB.MONGO_HOST}/${config.DB.MONGO_DB}?retryWrites=true&w=majority`,
      connectionOptions
    )

    console.log(`DB is connected to: ${db.connection.name}`)
  } catch (error) {
    console.log(error)
  }
})()
