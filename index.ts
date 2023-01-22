import express, { Application, Express } from "express";
require("./utils/db");
import cors from "cors";
import { config } from "dotenv";
import userRoute from "./router/userRouter";
import productRoute from "./router/productRouter";

const proc: any = config().parsed;

const port: number = proc.P0RT;

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRoute);
app.use("/product", productRoute);

app.listen(port, () => {
  console.log(`Server is listening to Post ${port}`);
});
