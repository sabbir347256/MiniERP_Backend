import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsyn";
import { sendResponse } from "../utils/utils";
import { Product } from "./product.model";
import StatusCodes from 'http-status-codes';
import QueryBuilder from "../utils/queryBuilder";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.productImage) {
    throw new Error('Image upload is required while creating a product.');
  }

  const result = await Product.create(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const productQuery = new QueryBuilder(Product.find(), req.query)
    .search(['name', 'sku', 'category'])
    .filter()
    .sort()
    .paginate();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    meta,
    data: result,
    message : 'AllProduct fetch successfully....!!!'
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successfully',
    data: null,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};