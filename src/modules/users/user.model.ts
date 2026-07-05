import { Schema, model } from 'mongoose';
import { IsActive, Role, TUser } from './user.interfaces';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: Object.values(Role), default: Role.EMPLOYEE, required: true},
    isActive: { type: Boolean, enum: Object.values(IsActive), default: IsActive.ACTIVE },
  },
  { timestamps: true },
);

export const User = model<TUser>('User', userSchema);