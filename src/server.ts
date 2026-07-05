import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import envVars from "./config/envVars";

dotenv.config();

const port = envVars.PORT || 5000;
const dbUrl = envVars.DB_URL;

const httpServer = createServer(app);

const startServer = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Database connected successfully");

        httpServer.listen(port, () => {
            console.log(`Server running on port : ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};




(async () => {
    startServer();
})();

// (async () => {
//     await seedSuperAdmin();
// })();
