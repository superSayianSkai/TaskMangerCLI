import inquirer from "inquirer";
import Task from "../schema/TaskSchema.js";
import chalk from "chalk";
import ora from "ora";

const readTask = async () => {
  const spinner = ora(chalk.greenBright("fetching Tasks")).start();
  try {
    const result = await Task.find().select(["name", "detail", "code", "-_id"]);
    for (let i = 0; i < result.length; i++) {
      const TodoCode = result[i].code;
      const TaskName = result[i].name;
      const TaskDetail = result[i].detail;
      process.stdout.write(
        "\n" +
          chalk.cyanBright("Task Code") +
          `:${TodoCode}` +
          "\n" +
          chalk.cyanBright("Name") +
          `:${TaskName}` +
          "\n" +
          chalk.cyanBright("Description") +
          `:${TaskDetail}` +
          "\n"
      );
    }
    spinner.stop();
  } catch (error) {
    spinner.fail("something went wrong");
    console.log(error);
    process.exit(1);
  }
};

export default readTask;
