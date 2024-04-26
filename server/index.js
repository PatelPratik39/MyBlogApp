import express from "express";
import chalk from "chalk";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";

dotenv.config();
const app = express();
app.use("/", Router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(chalk.magenta(`Your Server is Healthy at PORT : ${PORT}`));
});

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);
