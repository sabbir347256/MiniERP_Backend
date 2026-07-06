import express from 'express';
import { DashboardControllers } from './dashboard.controller';
import { checkAuth } from '../../middleware/auth.middleware';
import { Role } from '../users/user.interfaces';

const router = express.Router();

router.get('/stats', checkAuth(Role.ADMIN,Role.MANAGER,Role.EMPLOYEE), DashboardControllers.getDashboardStats);

export const DashboardRoutes = router;