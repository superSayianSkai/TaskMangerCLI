import mongoose from "mongoose";
import ora from "ora";
import chalk from "chalk";
export const mongoDBConnect = async () => {
  const spinner = ora("connectng to database").start();
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    spinner.succeed(chalk.greenBright("db connected"));
  } catch (error) {
    spinner.fail(chalk.redBright("failed to connect to db"));
    console.log(chalk.redBright(error));
    process.exit(1);
  }
};

export const mongoDBDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log(chalk.greenBright("db disconnected"));
    process.exit(0);
  } catch (error) {
    console.log(chalk.redBright("Error", error));
    process.exit(1);
  }
};
