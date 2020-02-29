// Generate a read me file with node
// Sections: Title, description, table of contents, installation, usage
// license, contributing, tests, questions


// packages
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");


// global variables

const writeFileAsync = util.promisify(fs.writeFile);

// functions
const username = () => {
    return inquirer.prompt({
    type: "input",
    message: "Enter your Github username:",
    name: "username"
});
}

const apiInfo = (response) => {
    const queryURL = `https://api.github.com/users/${response.username}`

    return new Promise ((resolve,reject) => {
        axios.get(queryURL).then((response) => {   
            user = {
                email: response.data.email,
                photo: response.data.avatar_url
            }
            resolve(user)
        })
    })
        
     
}

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
            name: "color",
            message: "Type what color you want your badge to be"
        },
        {
            type: "input",
            name: "label",
            message: "Label your badge (this badge is going on the 'tests' section of the README)"
        },
        {
            type: "input",
            name: "message",
            message: "Type your status on your badge (this badge is going on the 'tests' section of the README)"
        }
    ])
}

const markdown = (answers) => {
    return `# ${answers[0].title}

 ## Description

 ${answers[0].description}

## Table of Contents

${answers[0].table}

## Installation

${answers[0].installation}

## Usage

${answers[0].usage}

## Licenses

${answers[0].liscense}

## Contributing

${answers[0].contributing}

## Tests
[![Generic badge](https://img.shields.io/badge/${answers[0].label}-${answers[0].message}-${answers[0].color}.svg)](https://shields.io/)

${answers[0].tests}

## Questions
![](${answers[1].photo}?raw=true)

${answers[1].email}`
}

async function initiation() {
    console.log("hi");
    let emptyArr = [];
    try {
        const userInput = await username();
        const answer = await prompt();
        await emptyArr.push(answer);
         apiInfo(userInput).then(data => {
           emptyArr.push(data);
           console.log(emptyArr)
           const markdownFile = markdown(emptyArr);
           writeFileAsync("README.md", markdownFile)
           console.log("Successfully created README file!")
        }).catch((err) => {
            console.log(err);
        });       
    } catch(err) {
        console.log(err);
    }
}

initiation();

module.exports = readme;


