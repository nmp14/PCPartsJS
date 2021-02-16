const csv = require("csv-parser");
const inquirer = require("inquirer");
const fs = require("fs");
const main = require("./main");

const results = [];
let usernameAnswer;
let passwordAnswer;

let uniqueID;

let loginStatus = false;

const getUserInfo = async () => {
    fs.createReadStream('./user_login_info/user-info.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            //Call register function
            await login()
            await compareLoginInfo();
            await transfer();
        });
}

const login = async () => {
    // Get user input for username and password
    usernameAnswer = await getUsername();
    passwordAnswer = await getPassword();
}

const getUsername = () => {
    return inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "Enter username: ",
        }
    ])
}

const getPassword = () => {
    return inquirer.prompt([
        {
            name: "password",
            type: "password",
            message: "Enter password: ",
        }
    ])
}

const compareLoginInfo = () => {
    for (obj of results) {
        if (obj.Username === usernameAnswer.username && obj.Password === passwordAnswer.password) {
            console.log("You've successfully logged in!");
            uniqueID = obj.UniqueID;
            loginStatus = true;
            return;
        }
    }
    console.log("Incorrect username or password");
}

const transfer = () => {
    if (loginStatus) {
        main.mainFunction(uniqueID);
    }
}

module.exports = { getUserInfo }