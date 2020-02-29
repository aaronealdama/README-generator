// Generate a read me file with node
// Sections: Title, description, table of contents, installation, usage
// license, contributing, tests, questions

// packages
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

// functions
class ReadMe {
  // object constructor that constructs the ReadMe object

  constructor() {
    this.writeFileAsync = util.promisify(fs.writeFile);

    this.username = function() {
      return inquirer.prompt({
        type: "input",
        message: "Enter your Github username:",
        name: "username"
      });
    };

    // function that asks the user for their github username

    this.apiInfo = function(response) {
      const queryURL = `https://api.github.com/users/${response.username}`;

      return new Promise((resolve, reject) => {
        axios.get(queryURL).then(response => {
          user = {
            email: response.data.email,
            photo: response.data.avatar_url
          };
          resolve(user);
        });
      });
    };

    // function method that returns a promise which resolves the user object generated from the response info

    this.prompt = function() {
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
          name: "license",
          message: "Type any licenses"
        },
        {
          type: "input",
          name: "contributing",
          message: "Write who contributed to the project"
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
          message:
            "Label your badge (this badge is going on the 'tests' section of the README)"
        },
        {
          type: "input",
          name: "message",
          message:
            "Type your status on your badge (this badge is going on the 'tests' section of the README)"
        }
      ]);
    };

    // function method which prompts user multiple questions which is stored in an object

    this.markdown = function(answers) {
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
    
${answers[0].license}
    
## Contributing
    
${answers[0].contributing}
    
## Tests
[![Generic badge](https://img.shields.io/badge/${answers[0].label}-${answers[0].message}-${answers[0].color}.svg)](https://shields.io/)
    
${answers[0].tests}
    
## Questions
![](${answers[1].photo}?raw=true)
    
${answers[1].email}`;
    };

    // function method which formats the data from the inputed object into a ReadMe format

    this.initiation = async function() {
      // function method which holds an async function in order for code to execute sequentially
      console.log("hi");
      let emptyArr = [];
      // empty array to hold multiple objects
      try {
        const userInput = await this.username();
        // const userInput stores the username object
        const answer = await this.prompt();
        // const answer stores the prompt object
        emptyArr.push(answer);
        this.apiInfo(userInput)
          .then(data => {
            // apiInfo is invoked which takes the userInput object and uses a .then with the promise
            emptyArr.push(data);
            // data which is the resolved user object from the apiInfo function is pushed into the emptyArr
            console.log(emptyArr);
            const markdownFile = this.markdown(emptyArr);
            // const markdownFile stores the string generated from the markdown function method which takes the emptyArr
            // and formats the answers
            this.writeFileAsync("README.md", markdownFile);
            // invokes the writeFileAsync function which is promised and generates the readme file with the markdownFile
            // string
            console.log("Successfully created README file!");
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
  }
}

// ReadMe object is created and the initiation method is executed

module.exports = ReadMe;
// ReadMe object is exported
