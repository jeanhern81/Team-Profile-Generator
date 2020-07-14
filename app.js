const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const team = [];

//Function to prompt user to select a role
function employeeInformation() {
    inquirer.prompt9([
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
};

