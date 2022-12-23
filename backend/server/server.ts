import express, { Request, Response } from "express";
import cors from "cors";
import usersApi from "../api/usersApi";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersApi);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Page not found!",
  });
});

export default app;
