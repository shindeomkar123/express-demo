import express from "express";
import cors from "cors";
import foodRouter from "./router/foods.router";
import dotenv from "dotenv";
import { dbConnect } from "./configs/database.config";

dotenv.config();
dbConnect();

const app = express();
app.use("/api/foods", foodRouter);

app.use(cors({ origin: "http://localhost:4200" }));

app.use("/api/foods/", foodRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
