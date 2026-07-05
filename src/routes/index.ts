import { Router } from "express";


export const router = Router();

const moduleRoutes = [
    {
        path : '',
        router : ''
    }
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router);
});
