// Generate a read me file with node
// Sections: Title, description, table of contents, installation, usage
// license, contributing, tests, questions


// packages
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// global variables

const writeFileAsync = util.promisify(fs.writeFile);

// functions
const prompt = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is your title?"
        },
        {
            type: "input",
            name: "description",
            message: "Type your description"
        },
        {
            type: "input",
            name: "table",
            message: "Write table of contents"
        },
        {
            type: "input",
            name: "installation",
            message: "Type your installation process"
        },
        {
            type: "input",
            name: "usage",
            message: "Type the usage for the project"
        },
        {
            type: "input",
            name: "liscense",
            message: "Type any liscenses"
        },
        {
            type: "input",
            name: "contributing",
            message: "Write the contributers to the project"
        },
        {
            type: "input",
            name: "tests",
            message: "Type out any tests you did with your code"
        },
        {
            type: "input",
            name: "profile",
            message: "Enter your github profile picture link"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email"
        }
    ])
}

const markdown = (answers) => {
    return ` 
        # ${answers.title}

        ## Description

        ${answers.description}

        ## Table of Contents

        ${answers.table}

        ## Installation

        ${answers.installation}

        ## Usage

        ${answers.usage}

        ## Licenses

        ${answers.liscense}

        ## Contributing

        ${answers.contributing}

        ## Tests

        ${answers.test}

        ## Questions
        ![](${answers.profile}?raw=true)
        ${answers.email}
    `
}

async function initiation() {
    console.log("hi");
    try {
        const answer = await prompt();
        const markdownFile = markdown(answer);
        await writeFileAsync("README.md", markdownFile)
        console.log("Successfully created README file!")
    } catch(err) {
        console.log(err);
    }
}

initiation();
 


