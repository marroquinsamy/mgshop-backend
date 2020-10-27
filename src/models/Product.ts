import { Schema, model, Document, Model } from 'mongoose'

interface IProduct {
  title: string
  description: string
  price: number
  imagePath: string
}

export interface ProductDocument extends Document {
  title: string
  description: string
  price: number
  imagePath: string
  createdAt: Date
  updatedAt: Date
}

interface ProductModel extends Model<ProductDocument> {
  build(attr: IProduct): ProductDocument
}

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

productSchema.statics.build = (attr: IProduct): ProductDocument => {
  return new Product(attr)
}

const Product = model<ProductDocument, ProductModel>('Product', productSchema)

export default Product
