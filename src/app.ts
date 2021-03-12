import express from 'express'
import config from './config/config'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import passport from 'passport'

// Import routes
import productsRoutes from './modules/products/products.routes'
import adminRoutes from './modules/admin/admin.routes'
import authRoutes from './modules/auth/auth.routes'

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
app.use(adminRoutes)
app.use(authRoutes)

// Uploads folder
app.use('/uploads', express.static(path.resolve('uploads')))

export default app
