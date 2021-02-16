const Writer = require("./Write");
const inquirer = require("inquirer");
const nanoid = require("nanoid");
const csv = require('csv-parser')
const fs = require('fs')

const results = [];

// Read current userInfo.
const readData = async () => {
    fs.createReadStream('./user_login_info/user-info.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //Call register function
            register();
        });
}

// Register
const register = async () => {
    try {
        const userInfo = {}
        let usernameExists = false;

        const getUsername = async () => {
            return inquirer.prompt([
                {
                    name: "username",
                    type: "input",
                    message: "Enter username (between 4 and 16 characters)"
                }
            ])
        }

        const getPassword = async () => {
            return inquirer.prompt([
                {
                    name: "password",
                    type: "password",
                    message: "Enter password (between 4 and 16 characters)"
                }
            ])
        }

        // Answers from inquirer functions
        const usernameAnswer = await getUsername();
        // Make sure length of username is bettween 4 and 6
        if (usernameAnswer.username.length < 4 || usernameAnswer.username.length > 16) {
            console.log("Username must be bewteen 4 and 16 characters.");
            return;
        }

        const passwordAnswer = await getPassword();
        // Make sure length of password is bettween 4 and 6
        if (passwordAnswer.password.length < 4 || passwordAnswer.password.length > 16) {
            console.log("Password must be bewteen 4 and 16 characters.");
            return;
        }
        // Add username/password to userInfo Obj
        userInfo.username = usernameAnswer.username;
        userInfo.password = passwordAnswer.password;

        // Check if username already exists.
        results.forEach(obj => {
            if (obj.Username === usernameAnswer.username) {
                console.log("Username already exists!")
                usernameExists = true;
            }
        })

        // Generate uniqueID for user and add to userInfo obj
        userInfo.uniqueID = nanoid.nanoid();

        // Write (append) to CSV file
        if (!usernameExists) {
            const writer = new Writer;
            writer.writeCSVFile("./user_login_info/user-info.csv", "userInfo", [userInfo])
        }
    } catch (err) { console.log(err) }
}

module.exports = { readData };