import { catchAsync } from "../utils/catchAsyn";
import QueryBuilder from "../utils/queryBuilder";
import { sendResponse } from "../utils/utils";
import { User } from "./user.model";

const registerUser = catchAsync(async (req, res) => {
    const result = await User.create(req.body);
    const userObj = result.toObject();
    delete userObj.password;

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: userObj,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const userQuery = new QueryBuilder(User.find(), req.query)
        .search(['name', 'email'])
        .filter()
        .sort()
        .paginate();

    const result = await userQuery.modelQuery;

    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: 'All get user fetching successfully ...!!'
    });
});

export const UserControllers = {
  registerUser,
  getAllUsers,
};