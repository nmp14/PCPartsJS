const inquirer = require("inquirer");
const register = require("./register");
const login = require("./login");

const init = () => {
    inquirer.prompt([
        {
            name: "loginChoice",
            type: "list",
            message: "Login as a returning user or register?",
            choices: ["Login", "Register"]
        }
    ]).then(answers => {
        // If they choose register, call register function from register.js
        if (answers.loginChoice === "Register") {
            register();
        } else {
            login.getUserInfo();
        }
    })
}

init();