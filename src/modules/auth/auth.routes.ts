import { Router } from 'express'
import adminController from './auth.controller'

const router: Router = Router()

router.post('/login', adminController.login)

export default router
