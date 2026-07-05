import { Schema, model } from 'mongoose';
import { TSale } from './sales.interfaces';

const saleSchema = new Schema<TSale>(
  {
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    grandTotal: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Sale = model<TSale>('Sale', saleSchema);