import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { eventRouter } from "./src/routes/event.route.js";
import { categoryRouter } from "./src/routes/category.route.js";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", eventRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor corriendo en el puerto", PORT);
});
