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
//Stars acquire from the level


//The output area covers the 42% of the window's width and is devided in 25 squares(5*5), 
//so the width and the height of each square are:
const sqw = width * 0.42 / numOfColumns; //square width
const sqh = height / numOfRows; //square height

export default class MainModel {
    constructor(curentLevel = 1) {
        this.levels = [];
        this.curentLevel = curentLevel;
        this.setLevels();
        this.levelBlocks = [];
        this.levelCommands = [];
        this.checkPoints = [];
        this.stepsStars = [];
        this.startingPoinsssst = [];
        this.rocketPosition = {};
        this.charactersList = [];
        this.animCharacter = [];
        this.windowVariables = { width: width, height: height, sqw: sqw, sqh: sqh }
        this.observers = [];
        this.setCurentLevel(3);//curentLevel);
        this.stars = 0;
    }

    setLevels() {
        //set all the levels
        //Level 1; the spaceship panda has to move to the planet, it needs only move blocks
        let l1 = new Level(
            1, //id
            'istructions', //istructions
            [new BlockModel("Move Down", "move", []), //blocks
            new BlockModel("Move Up", "move", []),
            new BlockModel("Move Right", "move", []),
            new BlockModel("Move Left", "move", [])//,
            ],
            { //rocketPosition
                row: 5,
                column: 3,
                top: this.setTop(5),
                bottom: this.setBottom(5),
                left: this.rocketStartPositionLeft(3),
                right: this.rocketStartPositionRight(3)
              },
              [[3,1,null]],//checkPoints,
              [4,5], // 3 Stars = 4,  2 Stars = 5, 1 Star = anything else
              [{//characterList
                name: 'supermarket', 
                row: 1, 
                column: 3 
                }]
              ) 

        this.levels = [...this.levels, l1]; //add l1 in levels

        //Level 2; the spaceship panda has to move to the planet, we integratea foor loop to introduce a quicker way to code.
        let l2 = new Level(
            2,
            'instruction to level2',
            [new BlockModel("Move Down", "move", []), //blocks
            new BlockModel("Move Up", "move", []),
            new BlockModel("Move Right", "move", []),
            new BlockModel("Move Left", "move", []),
            new BlockModel("Repeat", "loop", ['1', '2', '3', '4']),
            new BlockModel("End Repeat", "loop", [])
            ],
            { //rocketPosition
                row: 5,
                column: 3,
                top: this.setTop(5),
                bottom: this.setBottom(5),
                left: this.rocketStartPositionLeft(3),
                right: this.rocketStartPositionRight(3)
              },
              [[1,3,null]],//checkPoints, 
              [4,5], // 3 Stars = 4,  2 Stars = 5, 1 Star = anything else
              [{//characterList
                name: 'bananaPlanet', 
                row: 1, 
                column: 3 
                }]
            ) 
        this.levels = [...this.levels, l2]; //add l2 in levels

        //Level 3; the spaceship panda has to get bananas from the banana planet and then move to the position of the monkey, they use move and loop blocks
        let l3 = new Level(
            3,
            'instruction to level3',
            [new BlockModel("Move Down", "move", []), //blocks
            new BlockModel("Move Up", "move", []),
            new BlockModel("Move Right", "move", []),
            new BlockModel("Move Left", "move", []),
            new BlockModel("Repeat", "loop", ['1', '2', '3', '4']),
            new BlockModel("End Repeat", "loop", [])
            ],
            { //rocketPosition
                row: 5,
                column: 3,
                top: this.setTop(5),
                bottom: this.setBottom(5),
                left: this.rocketStartPositionLeft(3),
                right: this.rocketStartPositionRight(3)
              },
              [[1,3,"banana"],[4,1,null]],//checkPoints, 
              [4,5], // 3 Stars = 4,  2 Stars = 5, 1 Star = anything else
              [{//characterList
                name: 'bananaPlanet', 
                row: 2, 
                column: 1 
                },
                {
                name: 'monkey', 
                row: 1, 
                column: 3 
                },
              ]
            ) 
        this.levels = [...this.levels, l3]; //add l3 in levels

        //Level 4; The panda waits for the animals to come by and using If, the panda will give them the right frut to each animal
        //Turtle = Strawberry, Monkey = Banana, Rabbit = Carrot
        let l4 = new Level(
            4,
            'instruction to level4',
            [new BlockModel("Move Down", "move", []), //blocks
            new BlockModel("Move Up", "move", []),
            new BlockModel("Move Right", "move", []),
            new BlockModel("Move Left", "move", []),
            new BlockModel("If", "if", ['monkey', 'rabbit', 'turtle']),
            new BlockModel("End If", "if", []),
            new BlockModel("Give Strawberry", "move"),
            new BlockModel("Give Carrot", "move"),
            new BlockModel("Give Banana", "move")
            ],
            { //rocketPosition
                row: 3,
                column: 3,
                top: this.setTop(5),
                bottom: this.setBottom(5),
                left: this.rocketStartPositionLeft(3),
                right: this.rocketStartPositionRight(3)
            },
            [],
            [10, 11], // 3 Stars = 10,  2 Stars = 11, 1 Star = anything else
            [[3, 3, "banana"], [3, 3, "carrot"], [3, 3, "strawberry"]],//checkPoints, 
            ['supermarket', 2, 3, 'Supermarket_Planet.png', 'horizontal'],//characterList
            [["monkey", 6, 3, 3, 3], ["monkey", 3, 3, 0, 3], ["rabbit", 6, 3, 3, 3], ["rabbit", 3, 3, 0, 3], ["turtle", 6, 3, 3, 3], ["turtle", 3, 3, 0, 3]]
        )
        this.levels = [...this.levels, l4]; //add l4 in levels


        //console.log(this.levels);
    }

    setCurentLevel(l) {
        this.curentLevel = l;
        const level = this.geLevelById(l);
        this.levelBlocks = this.levelCommands = [];
        this.notifyObservers();
        if (this.curentLevel) {
            const lb = level.getBlocks();
            // console.log("lb: " + lb)
            this.levelBlocks = [...lb];
            let emptyArray = [];
            this.levelCommands = [new CommandModel(0, 0, "When play", 'start', 150, emptyArray)]; //commands list is empty when the level is initialized
            const cp = level.getCheckPoints();
            this.checkPoints = [...cp];
            const ss = level.getStepsStars();
            this.stepsStars = [...ss];
            const rp = level.getRocketPosition();
            this.rocketPosition = rp;
            const cl = level.getCharacterList();
            this.charactersList = [...cl];
            this.notifyObservers();
        }
    }

    geLevelById(id) {
        return this.levels.find(element => element.id === id);
    }

    setCommands(commands) {
        this.levelCommands = [...commands]
        this.notifyObservers();
    }

    //function to center the position of the rocket at any screen
    rocketStartPositionRight(row) {
        //the rocket height is equal the height of square(sqh)
        //we know that the width = height/3, so the width of the rocket is:
        let rw = sqh / 3;
        //find how many squares to the right we have to place the item
        let right = this.setRight(row);
        //center the item by calculating the difference between its width and the width of the square
        //we have to leave equal distance from right and left of the rocket
        let distToCenter = (sqw - rw) / 2
        right = right + distToCenter;
        //console.log("right: " + right);
        return right;
    }
    getStars(){ return this.stars;}

    setStars(amount){ 
        console.log("Stars : "+ amount);
        this.stars = amount;
        this.notifyObservers();
    }

    rocketStartPositionLeft(row) {
        return width - this.rocketStartPositionRight(row);
        this.notifyObservers();
    }

    setRight(row) {
        return (numOfRows - row) * sqw;
        this.notifyObservers();
    }

    setLeft(row) {
        return width - this.setRight(row);
        this.notifyObservers();
    }

    setBottom(column) {
        return (numOfColumns - column) * sqh;
        this.notifyObservers();
    }

    setTop(column) {
        return height - this.setBottom(column);
        this.notifyObservers();
    }


    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback) {
        this.observers = this.observers.filter(cb => cb !== callback);
    }

    notifyObservers() {
        if (this.observers != undefined) {
            this.observers.forEach(cb => {
                try {
                    cb();
                } catch (error) {
                    console.log(error);
                }
            })
        }
    }
}