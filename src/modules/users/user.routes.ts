import express from 'express';
import { checkAuth } from '../../middleware/auth.middleware';
import { Role } from './user.interfaces';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/register',checkAuth(Role.ADMIN), UserControllers.registerUser);
router.get('/', checkAuth(Role.ADMIN), UserControllers.getAllUsers);

export const UserRoutes = router;