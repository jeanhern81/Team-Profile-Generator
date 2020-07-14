const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer.js");
const Intern = require("./Develop/lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");


const team = [];

//Function to prompt user to select a role
function employeeInformation() {
    inquirer.prompt([
        {
            type: "list",
            message: "What employee classiction would you like to input?",
            name: "name",
            choices: ["Manager", "Engineer", "Intern", "Show Summary"],
        },
    ]).then(val => {
        if (val.name === "Manager") {
            managerInformation();
        } else if (val.name === "Engineer") {
            engineerInformation();
        } else if (val.name === "Intern") {
            internInformation();
        } else if (val.name === "Show Summary") {
            generateHTML(outputPath, render(team));
        };
    });
}

//Function to colletion information on manager
function managerInformation() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What's your manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What's your manager's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What's your manager's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What's your manager's office number?",
            name: "number",
        },
    ]).then(function(answer) {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.number)
        team.push(manager);

        employeeInformation()
    });
}

//Fucntion to collect information on engineer and after to a new employee
function engineerInformation() {
    return inquirer.prompt([
        {
            type: "input",
            mesasge: "What's your engienner's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What's your engineer's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What's your engineer's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What's your engineer's GitHub username?",
            name: "GitHub",
        },
    ]).then(function(answer) {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.GitHub)
        team.push(engineer);
        employeeInformation()
    });
}



//Function to collect information on intern and then after the employee
function internInformation() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What's your interns name?",
            name: "name",
        },
        {
            type: "input",
            message: "What's your intern's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What's intern's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What's your intern's school",
            name: "school",
        },
    ]).then(function(answer) {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        team.push(intern);
        employeeInformation ()

    });
}

//Function to create README file
function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
    if (err) {
        throw err;
    }
    console.log("You have successfully written an Employee Summary");
    });
};

employeeInformation();

