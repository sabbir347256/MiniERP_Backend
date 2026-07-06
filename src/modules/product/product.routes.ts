import express from 'express';
import { ProductControllers } from './product.controller';
import { checkAuth } from '../../middleware/auth.middleware';
import { Role } from '../users/user.interfaces';
import { upload } from '../../config/multer';

const router = express.Router();

router.post('/', checkAuth(Role.ADMIN, Role.MANAGER), upload.single('file'), ProductControllers.createProduct);
router.get('/', checkAuth(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE), ProductControllers.getAllProducts);
router.patch('/:id', checkAuth(Role.ADMIN, Role.MANAGER), upload.single('file'), ProductControllers.updateProduct);
router.get(
    '/:id',
    checkAuth(Role.ADMIN,Role.MANAGER,Role.EMPLOYEE),
    ProductControllers.getSingleProduct
);
router.delete('/:id', checkAuth(Role.ADMIN), ProductControllers.deleteProduct);

export const ProductRoutes = router;