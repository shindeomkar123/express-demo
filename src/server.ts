import express from "express";
import cors from "cors";
import foodRouter from "./router/foods.router";
import dotenv from "dotenv";
import { dbConnect } from "./configs/database.config";
import usersRouter from "./router/users.router";

dotenv.config();
dbConnect();

const app = express();
app.use(express.json());

app.use((err: any, req: any, res: any, next: any) => {
  console.error("🔥 Unhandled Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});
app.use(cors({ origin: "http://localhost:4200" }));

app.use("/api/foods", foodRouter);

app.use("/api/users", usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
