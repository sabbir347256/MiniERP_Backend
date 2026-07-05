import appError from "../../errorHelpers/appError";
import { catchAsync } from "../utils/catchAsyn";
import QueryBuilder from "../utils/queryBuilder";
import { sendResponse, utils } from "../utils/utils";
import { User } from "./user.model";
import StatusCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from "express";
import { IsActive } from "./user.interfaces";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('register',req.body)
    const userData = { ...req.body };

    if (!userData.email) {
        throw new Error('Email is required!');
    }
    if (!userData.password) {
        throw new Error('Password is required!');
    }

    const normalizedEmail = userData.email.toLowerCase().trim();
    const isExist = await User.findOne({ email: normalizedEmail });

    if (isExist) {
        throw new Error('Email already registered!');
    }

    const hashedPassword = await bcryptjs.hash(userData.password, 10);

    const userRecord = new User({
        ...userData,
        email: normalizedEmail,
        password: hashedPassword,
        isActive: IsActive.ACTIVE,
    });

    await userRecord.save();

    const result = userRecord.toObject();
    delete (result as any).password;

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'User registered successfully and account is active.',
        data: result,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const userQuery = new QueryBuilder(User.find(), req.query)
        .search(['name', 'email'])
        .filter()
        .sort()
        .paginate();

    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        meta,
        data: result,
        message: 'All user fetching successfully ....!!'
    });
});

export const UserControllers = {
    registerUser,
    getAllUsers,
};