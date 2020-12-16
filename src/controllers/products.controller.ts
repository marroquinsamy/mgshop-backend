import { Request, Response } from 'express'
import Product, { ProductDocument } from '../models/Product'
import path from 'path'
import fs from 'fs-extra'

const duration: number = 3000

export const getProducts = async (
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

export const getProduct = async (
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

export const createProduct = async (
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
