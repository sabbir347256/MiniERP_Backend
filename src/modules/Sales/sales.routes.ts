import express from 'express';
import { SaleControllers } from './sales.controller';
import { checkAuth } from '../../middleware/auth.middleware';
import { Role } from '../users/user.interfaces';

const router = express.Router();

router.post('/', checkAuth(Role.ADMIN,Role.MANAGER,Role.EMPLOYEE), SaleControllers.createSale);

export const SaleRoutes = router;