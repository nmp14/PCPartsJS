const ReadAndWrite = require("./readAndWrite");
const inquirer = require("inquirer");

// Register
const register = async () => {
    try {
        //Answers from inquirer functions
        const usernameAnswer = await getUsername();
        if (usernameAnswer.username.length < 4 || usernameAnswer.username.length > 16) {
            console.log("username must be bewteen 4 and 16 characters.");
            return;
        }
        const passwordAnswer = await getPassword();
        if (passwordAnswer.password.lengh < 4 || passwordAnswer.password.length > 16) {
            console.log("username must be bewteen 4 and 16 characters.");
            return;
        }
        console.log("Retreived answers");
    } catch (err) { console.log(err) }
}

const getUsername = () => {
    return inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "Enter username (between 4 and 16 characters)"
        }
    ])
}

const getPassword = () => {
    return inquirer.prompt([
        {
            name: "password",
            type: "password",
            message: "Enter password (between 4 and 16 characters)";
        }
    ])
}