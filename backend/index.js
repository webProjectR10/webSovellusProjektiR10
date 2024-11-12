import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouter);

app.use((err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

app.listen(port);
