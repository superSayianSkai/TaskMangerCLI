import inquirer from "inquirer";
import User from "../schema/TaskSchema.js";
import Task from "../schema/TaskSchema.js";
import chalk from "chalk";
import ora from "ora";
import { response } from "express";

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
};

export const addTask = async () => {
  const spinner = ora();
  try {
    const result = await askQuestion();

    for (let i = 0; i < result.length; i++) {
      const response = result[i];
      console.log(result[i]);
      console.log("trying");
      await Task.create(response);
      process.stdout.write("task saved");
    }
    console.log("hey");
  } catch (error) {
    console.log(chalk.redBright(error));
  }
};
