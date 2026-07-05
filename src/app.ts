import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status-codes";
import expressSession from 'express-session';
import passport from "passport";
import path from "path";
import notFound from "./errorHelpers/notFound";

import './config/passport';
import { router } from "./routes";
import { globalErrorHandler } from "./errorHelpers/globalErrorHandle";

const app = express();


app.use(
    cors({
        origin: [
            "http://localhost:5173",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(
    expressSession({
        secret: "Your Secret",
        resave: false,
        saveUninitialized: false,
    }),
);



app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        message: "welcome to our bibah project server............",
    });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
