const inquirer = require("inquirer");
const nanoid = require("nanoid");
const fetch = require("node-fetch");

const register = async () => {
    // Get user input for username and password.
    usernameAnswer = await getUsername();
    passwordAnswer = await getPassword();

    const body = {
        username: usernameAnswer.username,
        password: passwordAnswer.password
    }

    //fetch
    const fetchResults = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    const resultsJSON = await fetchResults.json();

    // Wrong password or something went wrong
    if (fetchResults.status === 401 || fetchResults.status === 500) {
        console.log(resultsJSON.message);
        return false;
    }

    if (fetchResults.status === 201) {
        console.log("\nYou have successfully registered!\n");
        return true;
    }
}

const getUsername = () => {
    return inquirer.prompt([
        {
            name: "username",
            message: "Enter username (4-16 characters): "
        }
    ])
}

const getPassword = () => {
    return inquirer.prompt([
        {
            name: "password",
            type: "password",
            message: "Enter password (6-16 characters): "
        }
    ])
}

module.exports = register;