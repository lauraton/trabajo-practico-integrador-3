import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { startDB } from "./src/config/database.js";
import "dotenv/config";
import { authRouter } from "./src/routes/auth.route.js";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor corriendo en el puerto", PORT);
});
