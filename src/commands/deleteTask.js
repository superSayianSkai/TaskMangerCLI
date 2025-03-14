import inquirer from "inquirer";
import Task from "../schema/TaskSchema.js";
import chalk from "chalk";
import ora from "ora";
import readTask from "../commands/readTask.js";

const userInputTaskCode = async () => {
  const askUserInputTaskCode = await inquirer.prompt({
    name: "deleteTodo",
    type: "input",
    message: "Write the Code of the todo: ",
  });
  return askUserInputTaskCode;
};

const deleteTask = async () => {
  try {
    await readTask();
    let taskCode = await userInputTaskCode();
    const task = await Task.find().select(["code", "-_id"]);
    let newTaskCode = taskCode.deleteTodo.trim();
    let match = true;
    for (let i = 0; i < task.length; i++) {
      if (newTaskCode === task[i].code) {
        await Task.deleteOne({ code: newTaskCode });
        process.stdout.write(chalk.greenBright("Task deleted"));
        match = true;
        break;
      }

      if (!match) {
        process.stdout.write(chalk.redBright("TaskCode doesn't match"));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export default deleteTask;
