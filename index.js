import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/taskRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/api/task", route);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
