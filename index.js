const ReadAndWrite = require("./readAndWrite");
const inquirer = require("inquirer");

// Register
const register = async () => {
    try {
        //Answers from inquirer functions
        const usernameAnswer = await getUsername();
        if (usernameAnswer.username < 4 || usernameAnswer.username > 16) {
            console.log("username must be bewteen 4 and 16 characters.");
            return;
        }
        const passwordAnswer = await getPassword();
        console.log("Retreived answers");
    } catch (err) { console.log(err) }
}

getUsername = () => {
    return inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "Enter username (between 4 and 16 characters)"
        }
    ])
}