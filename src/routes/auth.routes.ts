import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'

const router: Router = Router()

router.post('/login', adminController.login)

export default router
