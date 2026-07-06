import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import appError from '../errorHelpers/appError';
import { verifyToken } from '../modules/utils/jwt';
import envVars from '../config/envVars';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/users/user.model';

export const checkAuth =
  (...restRole: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers.authorization as string;
        const accessToken = authHeader.split(" ")[1];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          throw new appError(httpStatus.UNAUTHORIZED, "Token not provided!");
        }

        if (!accessToken) {
          throw new appError(401, "Unauthorized! token must required.");
        }

        const verifyUser = verifyToken(
          accessToken as string,
          envVars.JWT_ACCESS_SECRET,
        ) as JwtPayload;


        if (!verifyUser) {
          throw new appError(httpStatus.UNAUTHORIZED, "Invalid token!");
        }

        const isUser = await User.findOne({ email: verifyUser?.email });
        if (!isUser) {
          throw new appError(httpStatus.UNAUTHORIZED, "No user found!");
        }

        if (restRole.length && !restRole.includes(verifyUser.role)) {
          throw new appError(
            httpStatus.FORBIDDEN,
            "You are not permitted to access this route!",
          );
        }

        req.user = verifyUser;
        next();
      } catch (error) {
        next(error);
      }
    };
