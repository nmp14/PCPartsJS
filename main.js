const PCbuilder = require("./PCpartsObj");
const inquirer = require("inquirer");
const fs = require("fs");

const mainFunction = async (id) => {
    await promptChoices(id);
}
// Prompt user for choices once logged on. User can check existing builds, access existing build, or make a new build.
const promptChoices = (id) => {
    inquirer.prompt([
        {
            name: "userOptions",
            type: "list",
            message: "Would you like to check existing builds, access an old build, or make a new build?",
            choices: ["Check builds", "Access build", "Make build"]
        }
    ]).then(answer => {
        if (answer.userOptions === "Check builds") buildCheck(id);
        else if (answer.userOptions === "Access build") accessBuild(id);
        else if (answer.userOptions === "Make build") buildMaker(id);
    })
}

const buildCheck = (id) => {
    if (!fs.existsSync(`./user_builds/${id}/`)) console.log("No builds found");
    else {
        // Access file in folder if it exists. List builds if any.
    }
}

const accessBuild = (id) => {
    inquirer.prompt([
        {
            name: "buildName",
            type: "input",
            message: "Which build would you like to access?"
        }
    ]).then(answer => {
        if (!fs.existsSync(`./user_builds/${id}/`)) console.log("Cannot find any builds");
        else {
            // Read file, find build, return it.
        }
    })
}

const buildMaker = (id) => {
    console.log("make builds");
}

module.exports = { mainFunction }