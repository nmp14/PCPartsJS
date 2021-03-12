const PCbuilder = require("./PCpartsObj");
const inquirer = require("inquirer");
const fetch = require("node-fetch");

//PC build
let newBuild;
// userInfo after logging in
let user;

const mainFunction = async (userInfo) => {
    user = userInfo;
    await promptChoices();
}
// Prompt user for choices once logged on. User can check existing builds, access existing build, or make a new build.
const promptChoices = () => {
    inquirer.prompt([
        {
            name: "userOptions",
            type: "list",
            message: "Would you like to check existing builds, access an old build, or make a new build?",
            choices: ["Check builds", "Access build", "Make build", "Quit"]
        }
    ]).then(answer => {
        // Check their answer and call function based on it.
        if (answer.userOptions === "Check builds") buildCheck();
        else if (answer.userOptions === "Access build") accessBuild();
        else if (answer.userOptions === "Make build") buildMaker();
        else if (answer.userOptions === "Quit") logOut();
    })
}
// Get all builds for user
const buildCheck = async () => {
    const fetchResults = await fetch(`http://localhost:8000/api/builds/checkAll/:${user.id}`);

    const fetchJSON = await fetchResults.json();

    if (fetchResults.status === 404) console.log(fetchJSON.message);
    if (fetchResults.status === 500) console.log(fetchJSON.message);
    if (fetchResults.status === 200) {
        if (fetchJSON.build.length === 0) {
            console.log("No builds were found\n");
        } else {
            console.log(...fetchJSON.build);
        }
    }

    // Go back to main choices.
    promptChoices();
}

//Access an old build
const accessBuild = () => {
    // Asks for name of old build.
    inquirer.prompt([
        {
            name: "buildName",
            type: "input",
            message: "Which build would you like to access?"
        }
    ]).then(answer => {

    })
}
//Makes a new build
const buildMaker = () => {
    inquirer.prompt([
        {
            name: "build",
            type: "input",
            message: "What would you like to name your build?"
        }
    ]).then(async (answer) => {
        newBuild = new PCbuilder(answer.build);
        console.log(newBuild);
    })
}

const logOut = () => {
    process.exit();
}

module.exports = mainFunction