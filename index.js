 const fs = require('fs');
 const inquirer = require('inquirer');
 const {Square, Triangle, Circle} = require('./lib/shapes');
 
 const questions = [
     {
         type: 'input',
         name: 'text',
         message: "Enter up to 3 characters for logo text",
         validate: input => input.length <= 3 || "Text cannot exceed 3 characters."
     },
     {
         type: 'input',
         name: 'textColor',
         message: "Please enter the text color: color keyword or hexadecimal number"
     },
     {
         type: 'list',
         name: 'shape',
         message: "Choose a shape:",
         choices: ["Square", "Triangle", "Circle"]
     },
     {
         type: 'input',
         name: 'shapeColor',
         message: "Enter a shape color: color keyword or hexadecimal number"
     }
 ];
 
 inquirer.prompt(questions).then(answers => {
     const {text, textColor, shape, shapeColor} = answers;
     let shapeObject;
     switch (shape) {
         case 'Square':
            shapeObject = new Square(shapeColor);
             break;
         case 'Triangle':
             shapeObject = new Triangle(shapeColor);
             break;
         case 'Circle':
            shapeObject = new Circle(shapeColor);
             break; 
     }
 
     const svgLogo = `
         <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
         ${shapeObject.render()}
         <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
         </svg>`;
         fs.writeFileSync('logo.svg', svgLogo.trim());
         console.log('File logo.svg was generated successfully!')
 });