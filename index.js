import express from "express";
import userRoutes from "./user/user.routes.js";
import { connectDB } from "./db_connect.js";

const app = express();

// to make app understand json
app.use(express.json());

//db connect
connectDB();

//register router
app.use(userRoutes);

const port = 4000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
