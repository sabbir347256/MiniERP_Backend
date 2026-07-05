
export enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    EMPLOYEE = "EMPLOYEE"
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
}

export type TUser = {
    name: string;
    email: string;
    password?: string;
    role: Role;
    isActive?: IsActive;
};