import express from 'express';
import { ProductControllers } from './product.controller';
import { checkAuth } from '../../middleware/auth.middleware';
import { Role } from '../users/user.interfaces';

const router = express.Router();

router.post('/', checkAuth(Role.ADMIN, Role.MANAGER), ProductControllers.createProduct);
router.get('/', checkAuth(Role.ADMIN, Role.MANAGER, 'EMPLOYEE'), ProductControllers.getAllProducts);
router.patch('/:id', checkAuth(Role.ADMIN, Role.MANAGER), ProductControllers.updateProduct);
router.delete('/:id', checkAuth(Role.ADMIN), ProductControllers.deleteProduct);

export const ProductRoutes = router;