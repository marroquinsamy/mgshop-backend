import { Router } from 'express'
import authController from './auth.controller'
import passport from 'passport'

const router: Router = Router()

router.post('/login', authController.login)

router.get(
  '/check-auth',
  passport.authenticate('jwt', { session: false }),
  authController.checkAuth
)

export default router
