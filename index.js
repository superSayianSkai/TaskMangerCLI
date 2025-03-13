import express from "express";
import helmet from "helmet";
import chalk from "chalk";
import { mongoDBConnect, mongoDBDisconnect } from "./src/db/mongodb.js";
import { addTask } from "./src/commands/addTask.js";
const app = express();
const PORT = process.env.PORT || 2000;

await mongoDBConnect();

app.listen(PORT, async () => {
  console.log(chalk.greenBright("server has started"));
  await addTask();
  mongoDBDisconnect();
});
