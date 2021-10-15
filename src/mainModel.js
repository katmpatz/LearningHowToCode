import BlockModel from './block/blockModel';
import CommandModel from './command/commandModel';
import Level from './level';

const numOfRows = 5;
const numOfColumns = 5;
const width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

//The output area covers the 42% of the window's width and is devided in 25 squares(5*5), 
//so the width and the height of each square are:
const sqw = width * 0.42 / numOfColumns; //square width
const sqh = height / numOfRows; //square height

export default class MainModel{    
    constructor(curentLevel=1){
        this.levels = [];
        this.curentLevel = curentLevel;
        this.setLevels();
        this.levelBlocks = [];
        this.levelCommands = [];
        this.checkPoints = [];
        this.startingPoint = [];
        this.rocketPosition = {};
        this.charactersList = [];
        this.windowVariables = {width: width, height: height, sqw: sqw, sqh:sqh}
        this.observers = [];
        this.setCurentLevel(curentLevel);
    }

    setLevels(){
        //set all the levels
        let l1 = new Level(
            1, //id
            'istructions', //istructions
            [   new BlockModel("Move Down", "move", []), //blocks
                new BlockModel("Move Up", "move", []),
                new BlockModel("Move Right", "move", []),
                new BlockModel("Move Left", "move", []),
                new BlockModel("If", "if", ['monkey', 'rabbit', 'turtle']),
                new BlockModel("End If", "if", []),
                new BlockModel("Repeat", "loop", ['1', '2', '3', '4']),
                new BlockModel("End Repeat", "loop", []),
              ], 
              { //rocketPosition
                row: 5, 
                column: 3, 
                top: this.setTop(5), 
                bottom: this.setBottom(5), 
                left: this.rocketStartPositionLeft(3), 
                right: this.rocketStartPositionRight(3)
              },
              [[3,1]],//checkPoints, 
              ['supermarket', 1, 3, 'Supermarket_Planet.png', 'horizontal'],//characterList
            ) 
        this.levels = [...this.levels, l1]; //add l1 in levels
        console.log(this.levels);
    }

    setCurentLevel(l){
        this.curentLevel = l;
        const level = this.geLevelById(l);
        this.levelBlocks = this.levelCommands = [];
        this.notifyObservers();
        if (this.curentLevel) {
            const lb = level.getBlocks();
            console.log("lb: " + lb)
            this.levelBlocks = [...lb];
            let emptyArray = [];
            this.levelCommands = [new CommandModel(0, 0, "When play", 'start',  150, emptyArray)]; //commands list is empty when the level is initialized
            const cp = level.getCheckPoints();
            this.checkPoints = [...cp];
            const rp = level.getRocketPosition();
            this.rocketPosition = rp;
            const cl = level.getCharacterList();
            this.charactersList = [...cl];
            this.notifyObservers();   
        }
    }

    geLevelById(id){
        return this.levels.find(element => element.id === id);
    }

    setCommands(commands) {
        this.levelCommands = [...commands]
        this.notifyObservers();
    }

    //function to center the position of the rocket at any screen
    rocketStartPositionRight(row){
        //the rocket height is equal the height of square(sqh)
        //we know that the width = height/3, so the width of the rocket is:
        let rw = sqh/3; 
        //find how many squares to the right we have to place the item
        let right = this.setRight(row);
        //center the item by calculating the difference between its width and the width of the square
        //we have to leave equal distance from right and left of the rocket
        let distToCenter = (sqw - rw)/2
        right = right + distToCenter;
        console.log("right: " + right);
        return right;
    }

    rocketStartPositionLeft(row){
        return width - this.rocketStartPositionRight(row);
    }

    setRight(row){
        return (numOfRows - row)* sqw;
    }

    setLeft(row){
        return width - this.setRight(row);
    }

    setBottom(column){
        return (numOfColumns - column)* sqh;
    }

    setTop(column){
        return height - this.setBottom(column);
    }


    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback) {
        this.observers = this.observers.filter(cb => cb !== callback);
    }

    notifyObservers() {
        if(this.observers != undefined){
            this.observers.forEach(cb => {
                try {
                    cb();
                } catch(error) {
                    console.log(error);
                }})
        }
        
    }

}