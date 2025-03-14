import express from "express";
import helmet from "helmet";
import chalk from "chalk";
import { mongoDBConnect, mongoDBDisconnect } from "./src/db/mongodb.js";
import action  from "./src/services/action.js";
const app = express();
const PORT = process.env.PORT || 2000;

await mongoDBConnect();
// app.use("/",);

app.listen(PORT, async () => {
  console.log(chalk.greenBright("server has started"));
  await action();
  mongoDBDisconnect();
});
