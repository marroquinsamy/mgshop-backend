import { Request, Response } from 'express'
import Product, { ProductDocument } from '../models/Product'
import path from 'path'
import fs from 'fs-extra'

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products: ProductDocument[] = await Product.find()

    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(204).json()
  }
}

export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params
    const productFound: ProductDocument | null = await Product.findById(id)

    return res.status(200).json(productFound)
  } catch (error) {
    console.log(error)
    return res.status(204).json()
  }
}

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const title: string = req.body.title
    const description: string = req.body.description
    const price: number = req.body.price
    const imagePath: string = req.file.path

    const productFound: ProductDocument | null = await Product.findOne({
      title: title,
    })
    if (productFound)
      return res.status(301).json({ message: 'The product already exists' })

    const product: ProductDocument = Product.build({
      title: title,
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

export const deleteProduct = async (
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

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id
    const title: string = req.body.title
    const description: string = req.body.description
    const price: number = req.body.price

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