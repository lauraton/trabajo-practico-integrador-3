import express from "express";
import { startDB } from "./src/config/database.js";
import "dotenv/config";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor corriendoe en el puerto ", PORT);
});
