import { Request, Response } from 'express'
import fs from 'fs-extra'
import path from 'path'
import Product, { ProductDocument } from '../products/products.model'

const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      title: hola,
      description,
      price,
    }: { title: string; description: string; price: number } = req.body
    const imagePath: string = req.file.path

    const productFound: ProductDocument | null = await Product.findOne({
      title: hola,
    })
    if (productFound)
      return res.status(301).json({ message: 'The product already exists' })

    const product: ProductDocument = Product.build({
      title: hola,
      description: description,
      price: price,
      imagePath: imagePath,
    })
    await product.save()
    return res
      .status(201)
      .json({ message: 'Product successfully saved', product })
  } catch (error) {
    console.log(error)
    return res.status(204).json()
  }
}

const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id

    const deletedProduct: ProductDocument | null = await Product.findByIdAndDelete(
      id
    )
    if (deletedProduct) await fs.unlink(path.resolve(deletedProduct.imagePath))

    return res.status(200).json({ message: 'Product deleted', deletedProduct })
  } catch (error) {
    console.log(error)
    return res.status(204).json()
  }
}

const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, title, description, price } = req.body

    const updatedProduct: ProductDocument | null = await Product.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true }
    )

    return res
      .status(201)
      .json({ message: 'Product successfully updated', updatedProduct })
  } catch (error) {
    console.log(error)
    return res.status(204).json()
  }
}

const checkAuth = (req: Request, res: Response): Response => {
  try {
    return res.status(200).json()
  } catch (error) {
    console.log(error)
    return res.status(401).json()
  }
}

interface IAdminController {
  createProduct(req: Request, res: Response): Promise<Response>
  updateProduct(req: Request, res: Response): Promise<Response>
  deleteProduct(req: Request, res: Response): Promise<Response>
  checkAuth(req: Request, res: Response): Response
}

const adminController: IAdminController = {
  createProduct,
  updateProduct,
  deleteProduct,
  checkAuth,
}

export default adminController
