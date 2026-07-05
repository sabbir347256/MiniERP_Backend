import { Types } from 'mongoose';

export type TSaleProduct = {
  productId: Types.ObjectId;
  quantity: number;
};

export type TSale = {
  products: TSaleProduct[];
  grandTotal: number;
  saleDate: Date;
};