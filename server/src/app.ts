import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./router/users";
import toiletRouter from "./router/toilets";
import reportRouter from "./router/reports";
import "reflect-metadata";
import { DB } from "./data-source";
import cookieparser from "cookie-parser";

DB.initialize();

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:3000/",
    ],
    credentials: true,
  })
);

app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieparser());

app.use("/users", userRouter);
app.use("/toilets", toiletRouter);
app.use("/reports", reportRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send("server error");
});

app.listen(port, () => {
  console.log("Server running");
});
