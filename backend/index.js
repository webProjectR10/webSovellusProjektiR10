import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import groupsRouter from "./routers/groupsRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import memberRouter from "./routers/memberRouter.js";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouter);
app.use("/groups", groupsRouter);
app.use("/review", reviewRouter);
app.use("/members", memberRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

app.listen(port);
