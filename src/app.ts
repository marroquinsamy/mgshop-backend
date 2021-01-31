import express from 'express'
import config from './config/config'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import passport from 'passport'

// Import routes
import productsRoutes from './routes/products.routes'
import privateProductsRoutes from './routes/products-private.routes'
import authRoutes from './routes/auth.routes'

// Scripts
import passportMiddleware from './middlewares/passport'

// Initializations
const app: express.Express = express()

// Settings
app.set('port', config.PORT)

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

// Routes
app.use(productsRoutes)
app.use(privateProductsRoutes)
app.use(authRoutes)

// Uploads folder
app.use('/uploads', express.static(path.resolve('uploads')))

export default app
