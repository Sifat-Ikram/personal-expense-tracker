import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import resetPassword from "./routes/resetPassword.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

// Connect to your MongoDB database
connectDB();

// Allowed origins for CORS
// const allowedOrigins = ["https://tasko-task-management.vercel.app"];
// {
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (!allowedOrigins.includes(origin)) {
//         return callback(new Error("Not allowed by CORS"), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//   }

// Use CORS middleware once with custom config
app.use(
  cors()
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Your API routes
app.use("/api/user", userRoutes);
app.use("/api", resetPassword);

// Health check route
app.get("/api/health", (req, res) => res.status(200).json({ status: "OK" }));

// 404 handler for unknown routes
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// Global error handler
app.use(errorHandler);

export default app;
