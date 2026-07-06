import { Router } from "express";
import { UserRoutes } from "../modules/users/user.routes";
import { AuthRouter } from "../modules/auth/auth.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { SaleRoutes } from "../modules/Sales/sales.routes";
import { DashboardRoutes } from "../modules/Dashboard/dashboard.routes";


export const router = Router();

const moduleRoutes = [
    {
        path : '/user',
        router : UserRoutes
    },
    {
        path : '/auth',
        router : AuthRouter
    },
    {
        path : '/product',
        router : ProductRoutes
    },
    {
        path : '/sales',
        router : SaleRoutes
    },
    {
        path : '/dashboard',
        router : DashboardRoutes
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router);
});
