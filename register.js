const ReadAndWrite = require("./readAndWrite");
const inquirer = require("inquirer");

// Register
const register = async () => {
    try {
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
                    message: "Enter password (between 4 and 16 characters)"
                }
            ])
        }

        //Answers from inquirer functions
        const usernameAnswer = await getUsername();
        //Make sure length of username is bettween 4 and 6
        if (usernameAnswer.username.length < 4 || usernameAnswer.username.length > 16) {
            console.log("username must be bewteen 4 and 16 characters.");
            return;
        }

        const passwordAnswer = await getPassword();
        //Make sure length of password is bettween 4 and 6
        if (passwordAnswer.password.lengh < 4 || passwordAnswer.password.length > 16) {
            console.log("username must be bewteen 4 and 16 characters.");
            return;
        }
        console.log("Retreived answers");
    } catch (err) { console.log(err) }
}

module.exports.register;