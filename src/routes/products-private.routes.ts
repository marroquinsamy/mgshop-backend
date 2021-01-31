import { Router } from 'express'
import passport from 'passport'
import * as productsController from '../controllers/products.controller'
import multer from '../lib/multer'

const router: Router = Router()

router.post(
  '/products',
  passport.authenticate('jwt', { session: false }),
  multer.single('image'),
  productsController.createProduct
)

router.put(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  productsController.updateProduct
)

router.delete(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  productsController.deleteProduct
)

export default router
