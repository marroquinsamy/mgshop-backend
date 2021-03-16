import { Request, Response } from 'express'
import Product, { ProductDocument } from './products.model'

const getProducts = async (
  req: Request,
  res: Response
): Promise<Response<ProductDocument[]> | undefined> => {
  let products: ProductDocument[]
  try {
    products = await Product.find()
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again in a moment.' })
  }

  if (products.length === 0) {
    return res.status(204).json()
  } else {
    return res.status(200).json(products)
  }
}

const getProduct = async (
  req: Request,
  res: Response
): Promise<Response<ProductDocument[]> | undefined> => {
  try {
    const { id } = req.params
    const product: ProductDocument | null = await Product.findById(id)

    if (product) {
      let productInArray: ProductDocument[] = []
      productInArray.push(product)
      return res.status(200).json(productInArray)
    } else {
      return res.status(404).json()
    }
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
