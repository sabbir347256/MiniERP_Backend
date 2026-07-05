import envVars from "../../config/envVars";
import { TUser } from "../users/user.interfaces";
import { generateToken } from "./jwt";

export const createUserToken = async(user : Partial<TUser>) => {
    const jwtPayload = {
        email: user?.email,
        role: user?.role,
        name : user?.name,
      };
    
      const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,String(envVars.JWT_ACCESS_EXPIRES));
      const refreshToken = generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET,String(envVars.JWT_REFRESH_EXPIRES));

      return {
        accessToken,
        refreshToken
      }
};
