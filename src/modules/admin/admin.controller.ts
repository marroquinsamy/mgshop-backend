import { Request, Response } from 'express'
import fs from 'fs-extra'
import path from 'path'
import Product, { ProductDocument } from '../products/products.model'

const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    title,
    description,
    price,
  }: { title: string; description: string; price: number } = req.body
  const imagePath: string = req.file.path

  try {
    const product: ProductDocument = Product.build({
      title,
      description,
      price,
      imagePath,
    })
    await product.save()
    return res.status(201).json(product)
  } catch (error) {
    console.log(error)
    return res.status(401).json()
  }
}

const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  let deletedProduct: ProductDocument | null
  try {
    deletedProduct = await Product.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again in a moment.' })
  }

  if (deletedProduct) {
    try {
      await fs.unlink(path.resolve(deletedProduct.imagePath))
    } catch (error) {
      console.error(error)
    }
    return res.status(200).json(deletedProduct)
  }
  return res.status(404).json({ message: 'Product not found.' })
}

const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    title,
    description,
    price,
  }: { title: string; description: string; price: number } = req.body
  const { id } = req.params
  let updatedProduct: ProductDocument | null
  try {
    updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true }
    )
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again in a moment.' })
  }

  if (updatedProduct) {
    return res.status(200).json(updatedProduct)
  }

  return res.status(404).json({ message: 'Product not found.' })
}

interface IAdminController {
  createProduct(req: Request, res: Response): Promise<Response>
  updateProduct(req: Request, res: Response): Promise<Response>
  deleteProduct(req: Request, res: Response): Promise<Response>
}

const adminController: IAdminController = {
  createProduct,
  updateProduct,
  deleteProduct,
}

export default adminController
