import { Router } from "express";
import { authUserController } from "./auth.controller";
import passport from "passport";


const router = Router();

router.post('/login', authUserController.credentialLogin);

export const AuthRouter = router;