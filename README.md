# Getting Started with LearningHowToCode

![alt text](https://github.com/katmpatz/LearningHowToCode/blob/master/src/img/app.png?raw=true)

## Description 
LearningHowToCode is a web application that teaches the logic of programming to young children, from 9 to 15 years old. Through gamified challenges the children will get familiar with programming concepts like simple commands, variables, if/else statements, for loops and more. For example, in our game the kids have to help a little panda to complete some challenges at the space. The kids have to choose some Commands from a menu (ex. move, repeat), drag and drop them in a canvas in order to execute an action, if the player place the commands in the right order and then run their code they will see the results. When kids complete a challenge we will value their performance and then they will move forward to the next level. 

### Description of the challenges

A panda is discovering the universe with its little spaceship. The challenges that it has to face are the followings:
- The panda has to go to its work, the super market planet by moving up/down/right/left in the space (the blocks will be move up, move down, move left, move right, it's not possible to choose a number of steps to move)
- The panda is late and has to go to his work at the super market planet really fast! So instead of repeating the movement blocks, the kid has to use a repeat block. With this way the spaceship will be in a turbo mood, and the panda will arrive on time!
- The panda has to deliver some bananas at its monkey friends! He has to visit the banana planet, take the bananas and after visit the monkey's planet.
- The panda is working to the supermarket planet. If a monkey come it has to give some bananas, if a rabbit come some carrots and some strawberries at the turtles. 

**Note: The last feature is not implemented yet.**

## Technical Description
For the developement of the application we used React.js, MaterialUI and CSS. Also, we used an MVC architecture. In more detail we seperated the logic from the UI part and we have for each component a view and a controller(presenter) file. The view displays the output and the visual elements and the controller observes and handles the changes happening to the view in order to update the model. The model of our application has information about the different challenges (ect. level, description, commands, status, stars, help).  

## How to download and run the project
Node.js and npm are required to run your project at your computer. To download them click [here](https://nodejs.org/en/download/).If you have any problem with the installation see [this](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) article about how to download and use node.js and npm.      
Also for this project you will need a terminal, we used [gitBash](https://git-scm.com/downloads).

After you download all the neccesary programs you have to follow the next steps:

1. Open your terminal go to the folder that you want to save the project and clone the project there. 
    `git clone https://github.com/katmpatz/LearningHowToCode.git` 

2. Then go to the program directory:
    `cd LearningHowToCode` 

3. Install all the necessary node libraries for the prioject:
    `npm install` 

3. Run the project.:
    `npm start` 

A new window at your browser will open, probably at the port 3000 and will you be able to use the project.


