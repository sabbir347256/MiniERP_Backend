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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let grandTotal = 0;

        for (const item of products) {
            const product = await Product.findById(item.productId).session(session);

            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            if (product.stockQuantity < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product.name}`);
            }

            product.stockQuantity -= item.quantity;
            await product.save({ session });

            grandTotal += product.sellingPrice * item.quantity;
        }

        const saleRecord = new Sale({
            products,
            grandTotal,
        });

        await saleRecord.save({ session });

        await session.commitTransaction();
        session.endSession();

        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'Sale executed and processed successfully',
            data: saleRecord,
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(error.message);
    }
});

export const SaleControllers = {
    createSale,
};