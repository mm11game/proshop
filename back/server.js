import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: `http://localhost:3000`, //클라이언트의 오리진
    method: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTION"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

console.log("bbbbb");
app.listen(PORT, console.log(`Server listening ${PORT}`));
