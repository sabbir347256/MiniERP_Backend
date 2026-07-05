import bcryptjs from "bcryptjs";
import { User } from "../users/user.model";
import envVars from "../../config/envVars";
import { IsActive, Role } from "../users/user.interfaces";

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({
            email: process.env.SUPER_ADMIN_EMAIL as string,
        });

        if (isSuperAdminExist) {
            return;
        }

        const hashedPassword = await bcryptjs.hash(
            envVars.SUPER_ADMIN_PASSWORD as string,
            Number(process.env.BCRYPT_SALT_ROUND),
        );


        await User.create({
            name: "Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL as string,
            password: hashedPassword,
            role: Role.ADMIN, 
            isActive: IsActive.ACTIVE,
        });
    } catch (err) {
        console.log(err);
    }
};
