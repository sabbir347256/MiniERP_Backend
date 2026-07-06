import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsyn";
import { sendResponse } from "../utils/utils";
import { Product } from "../product/product.model";
import { Sale } from "../Sales/sales.model";
import StatusCodes from 'http-status-codes';

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const totalProducts = await Product.countDocuments();
  const lowStockProducts = await Product.find({ stockQuantity: { $lt: 5 } });

  const salesAgg = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$grandTotal' },
      },
    },
  ]);

  const totalSales = salesAgg[0]?.totalSales || 0;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message : 'All information fetching successfully....!!S',
    data: {
      totalProducts,
      totalSales,
      lowStockProducts,
    },
  });
});

export const DashboardControllers = {
  getDashboardStats,
};