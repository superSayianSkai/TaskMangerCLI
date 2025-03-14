import inquirer from "inquirer";
import Task from "../schema/TaskSchema.js";
import chalk from "chalk";
import ora from "ora";

const input = async () => {
  const answers = await inquirer.prompt([
    {
      name: "name",
      message: "Enter the name of your Task:",
      type: "input",
    },
    {
      name: "detail",
      message: "Enter the detail of your Task:",
      type: "input",
    },
  ]);
  return answers;
};

const askQuestion = async () => {
  try {
    let loop = true;
    const taskList = [];
    let moreInput;
    do {
      const userInput = await input();

      const shallowCopyOfUserInput = {
        ...userInput,
        name: userInput.name.trim(),
        detail: userInput.detail.trim(),
      };

      taskList.push(shallowCopyOfUserInput);

      while (true) {
        moreInput = await inquirer.prompt({
          name: "addMoreTask",
          message: "do you want more questions? ",
          type: "input",
        });
        moreInput = moreInput.addMoreTask.toLowerCase();

        if (moreInput === "yes") {
          loop = true;

          break;
        } else if (moreInput === "no") {
          loop = false;
          return taskList;
          break;
        } else {
          console.log("yes or no input is  expected");
        }
      }
    } while (loop);
  } catch (error) {
    console.log(error);
  }
};

 const addTask = async () => {
  try {
    const result = await askQuestion();
    for (let i = 0; i < result.length; i++) {
      const response = result[i];
      console.log(result[i]);
      const spinner = ora("Saving").start();
      await Task.create(response);
      spinner.succeed(chalk.greenBright("task saved"));
      spinner.stop();
    }
  } catch (error) {
    spinner.fail(chalk.redBright(error));
    console.log(chalk.redBright(error));
  }
};
export default addTask