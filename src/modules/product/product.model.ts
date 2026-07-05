import { Schema, model } from 'mongoose';
import { TProduct } from './product.interfaces';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    productImage: { type: String, required: true },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchema);