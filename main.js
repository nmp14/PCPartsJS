const PCbuilder = require("./PCpartsObj");
const inquirer = require("inquirer");
const fs = require("fs");
const ReadandWrite = require("./Write");

//PC build
let newBuild;

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
        // Check their answer and call function based on it.
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
//Access an old build
const accessBuild = (id) => {
    // Asks for name of old build.
    inquirer.prompt([
        {
            name: "buildName",
            type: "input",
            message: "Which build would you like to access?"
        }
    ]).then(answer => {
        // If user folder doesnt exist, log error and reprompt choices.
        if (!fs.existsSync(`./user_builds/${id}/`)) {
            console.log("Cannot find any builds");
            promptChoices(id);
        }
        else {
            //Check if build exists. If not, log error and reprompt choices.
            if (!fs.existsSync(`./user_builds/${id}/${answer.buildName}.csv`)) {
                console.log("Can't find that build.");
                promptChoices(id);
            } else {
                console.log("Build found!\n\nAccessing now...\n");
            }
        }
    })
}
//Makes a new build
const buildMaker = (id) => {
    inquirer.prompt([
        {
            name: "build",
            type: "input",
            message: "What would you like to name your build?"
        }
    ]).then(async (answer) => {
        newBuild = new PCbuilder(answer.build)
    }).then(() => {
        //Write new build to csv file.
        writeNewPCData(id);
    })
}
//Function for writing new build to csv file
const writeNewPCData = async (id) => {
    const write = new ReadandWrite;
    // Check if user dir exists otherwise make it.
    if (!fs.existsSync(`./user_builds/${id}/`)) {
        fs.mkdirSync(`./user_builds/${id}/`)
    }
    // Writes name of build to name column of csv file.
    const writeObj = { name: newBuild.buildName }
    // Header for csv file.
    const header = [
        { id: 'name', title: 'Name' }
    ]
    // If file for build doesnt exist, make it. Otherwise log exists and reprompt choices.
    if (!fs.existsSync(`./user_builds/${id}/${newBuild.buildName}.csv`)) {
        await write.writeCSVFile(`./user_builds/${id}/${newBuild.buildName}.csv`, "pcCreate", [writeObj], header)
        //After writing, temporarily go back to choices as placeholder. Will later allow immediete access. Timer is bandaid for async stuff.
        setTimeout(() => promptChoices(id), 500);
    } else {
        console.log("Build already exists!");
        promptChoices(id);
    }
}

module.exports = { mainFunction }