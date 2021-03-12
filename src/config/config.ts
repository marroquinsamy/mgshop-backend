import dotenv from 'dotenv'
dotenv.config()

interface IConfig {
  PORT: string | number
  DB: {
    MONGO_HOST: string
    MONGO_DB: string
    MONGO_USER: string
    MONGO_PASSWORD: string
  }
  jwtSecret: string
  admin: {
    username: string
    password: string
  }
}

const config: IConfig = {
  PORT: process.env.PORT || 4000,
  DB: {
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_DB: process.env.MONGO_DB || 'mgshop-backend',
    MONGO_USER: process.env.MONGO_USER || '',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
  },
  jwtSecret: process.env.JWT_SECRET || 'secrettoken',
  admin: {
    username: process.env.ADMIN_USERNAME || '',
    password: process.env.ADMIN_PASSWORD || '',
  },
}

export default config
