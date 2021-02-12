import { Router } from 'express'
import productsController from './products.controller'

const router: Router = Router()

router.get('/products', productsController.getProducts)

router.get('/products/:id', productsController.getProduct)

export default router
