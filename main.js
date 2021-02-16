const PCbuilder = require("./PCpartsObj");
const inquirer = require("inquirer");

const mainFunction = async (id) => {
    await promptChoices();
}

const promptChoices = () => {
    inquirer.prompt([
        {
            name: "userOptions",
            type: "list",
            message: "Would you like to check existing builds, access an old build, or make a new build?",
            choices: ["Check builds", "Access build", "Make build"]
        }
    ]).then(answer => {
        if (answer.userOptions === "Check builds") buildCheck();
        else if (answer.userOptions === "Access build") accessBuild();
        else if (answer.userOptions === "Make build") buildMaker();
    })
}

const buildCheck = () => {
    console.log("build check");
}

const accessBuild = () => {
    console.log("access build");
}

const buildMaker = () => {
    console.log("make builds");
}

module.exports = { mainFunction }