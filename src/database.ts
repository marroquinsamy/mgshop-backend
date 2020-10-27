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
      `mongodb://${config.DB.MONGO_HOST}/${config.DB.MONGO_DB}`,
      connectionOptions
    )

    console.log(`DB is connected to: ${db.connection.name}`)
  } catch (error) {
    console.log(error)
  }
})()
