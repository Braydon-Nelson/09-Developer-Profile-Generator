const fs = require("fs");
const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const axios = require("axios");
var pdf = require('html-pdf');

//Questions array used to prompt user
const questions = [
    {
        type: "input",
        message: "What is your user name?",
        name: "username"
    },
    {
        type: 'list',
        name: 'color',
        message: 'What is your favorite color?',
        choices: [
            'red',
            'blue',
            'pink',
            'green'
        ]
    }
];
//Prompt user with questions, then based on user name axios call GitHub for that users data
inquirer.prompt(questions).then(function ({ username, color }) {
    console.log(username, color);
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function (response) {
        console.log(response.data)
        //Code for Just HTML Page
        fs.writeFile("./generate.html", generateHTML(response, color), function (err, result) {
            if (err) console.log('error', err);
        })
        //Code for html-pdf
        pdf.create(generateHTML(response, color)).toFile('./profile.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res);
        });


    })



});