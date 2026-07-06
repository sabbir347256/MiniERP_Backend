import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsyn";
import { sendResponse } from "../utils/utils";
import StatusCodes from 'http-status-codes';
import mongoose from "mongoose";
import { Product } from "../product/product.model";
import { Sale } from "./sales.model";

const createSale = catchAsync(async (req: Request, res: Response) => {
  const { products } = req.body;

  if (!products || !products.length) {
    throw new Error('Products array cannot be empty');
  }

  let grandTotal = 0;

  for (const item of products) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }

    if (product.stockQuantity < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }

    product.stockQuantity -= item.quantity;
    await product.save();

    grandTotal += product.sellingPrice * item.quantity;
  }

  const saleRecord = new Sale({
    products,
    grandTotal,
  });

  await saleRecord.save();

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Sale executed and processed successfully',
    data: saleRecord,
  });
});

export const SaleControllers = {
  createSale,
};