const csv = require("csv-parser");
const inquirer = require("inquirer");
const fs = require("fs");

const results = [];
let usernameAnswer;
let passwordAnswer;

const getUserInfo = async () => {
    fs.createReadStream('./user_login_info/user-info.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //Call register function
            login().then(() => {
                compareLoginInfo();
            });
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
            return;
        }
    }
    console.log("Incorrect username or password");
}


module.exports = { getUserInfo }