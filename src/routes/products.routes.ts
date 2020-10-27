import { Router } from 'express'
import * as productController from '../controllers/products.controller'
import multer from '../lib/multer'

const router: Router = Router()

router
  .route('/products')
  .get(productController.getProducts)
  .post(multer.single('image'), productController.createProduct)

router
  .route('/products/:id')
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)

export default router
