import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import categoyRoutes from "./routes/category.routes.js";
import resetPassword from "./routes/resetPassword.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

connectDB();

const allowedOrigins = [
  "https://personal-expense-tracker-flame-psi.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/category", categoyRoutes);
app.use("/api", resetPassword);

app.get("/api/health", (req, res) => res.status(200).json({ status: "OK" }));

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.use(errorHandler);

export default app;
