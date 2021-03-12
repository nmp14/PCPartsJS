const inquirer = require("inquirer");
const fetch = require("node-fetch");
//const main = require("./main");

let loginStatus = false;

const login = async () => {
    // Get user input for username and password
    usernameAnswer = await getUsername();
    passwordAnswer = await getPassword();

    const body = {
        username: usernameAnswer.username,
        password: passwordAnswer.password
    }

    const results = await fetch(`http://localhost:8000/api/users/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
    const resultJSON = await results.json();
    // If status === 401 (bad authentication) or 500 (internal server error) log message and return.
    if (results.status === 401 || results.status === 500) {
        console.log(resultJSON.message);
        return;
    }
    // If successful login
    loginStatus = true;
    pendTransfer(resultJSON.admin);
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


const pendTransfer = (user) => {
    if (loginStatus) {
        let dots = ".."
        // Add some dots after login for fun.
        const interval = setInterval(() => {
            process.stdout.write(`${dots}\r`);
            dots += "."
            if (dots === ".......") {
                clearInterval(interval);
                console.log("You've successfully logged in!");
                transfer(user);
            }
        }, 500)
    }
}

const transfer = (user) => {
    console.log("-------\n");
    //main(user);
}


module.exports = login;