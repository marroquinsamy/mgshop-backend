import { Request, Response } from 'express'
import Product, { ProductDocument } from './products.model'

const duration: number = 0

const getProducts = async (
  req: Request,
  res: Response
): Promise<Response<ProductDocument[]> | undefined> => {
  try {
    const products: ProductDocument[] = await Product.find()
    // const products: ProductDocument[] = []

    setTimeout(() => {
      products.length === 0
        ? res.status(204).json()
        : res.status(200).json(products)
    }, duration)
  } catch (error) {
    console.log(error)
    return res.status(500).json('oh noes!')
  }
}

const getProduct = async (
  req: Request,
  res: Response
): Promise<Response<ProductDocument> | undefined> => {
  try {
    const { id } = req.params
    const product: ProductDocument | null = await Product.findById(id)

    setTimeout(() => {
      product ? res.status(200).json(product) : res.status(404).json()
    }, duration)
  } catch (error) {
    console.log(error)

    return res.status(404).json()
  }
}

const productsController = {
  getProducts: getProducts,
  getProduct: getProduct,
}

export default productsController
