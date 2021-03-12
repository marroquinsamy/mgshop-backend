import { Router } from 'express'
import passport from 'passport'
import adminController from './admin.controller'
import multer from '../../lib/multer'

const router: Router = Router()

router.post(
  '/products',
  passport.authenticate('jwt', { session: false }),
  multer.single('productPicture'),
  adminController.createProduct
)

router.put(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  adminController.updateProduct
)

router.delete(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  adminController.deleteProduct
)

router.get(
  '/check-auth',
  passport.authenticate('jwt', { session: false }),
  adminController.checkAuth
)

export default router
