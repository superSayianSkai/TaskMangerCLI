import inquirer from "inquirer";
import addTask from "../commands/addTask.js";
import readTask from "../commands/readTask.js";
import deleteTask from "../commands/deleteTask.js";
import updateTask from "../commands/updateTask.js";
import chalk from "chalk";

const pickActionOption = async () => {
  const option = await inquirer.prompt([
    {
      type: "checkbox",
      name: "action",
      message: "What do you want to do?" + "\n",
      choices: ["Add Task", "Delete Task", "Read Task", "Update Task"],
    },
  ]);

  return option;
};

const action = async () => {
  try {
    let loop = true;
    do {
      const userOption = await pickActionOption();
      const selectedActions = userOption.action || [];
      if (selectedActions.includes("Add Task")) {
        await addTask();
        loop = false;
      } else if (selectedActions.includes("Read Task")) {
        await readTask();
        loop = false;
      } else if (selectedActions.includes("Delete Task")) {
        await deleteTask();
        loop = false;
      } else if (selectedActions.includes("Update Task")) {
        await updateTask();
        loop = false;
      } else {
        process.stdout.write(
          chalk.redBright("Wrong input read the instructions") + "\n"
        );
        loop = true;
      }
    } while (loop);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default action;
