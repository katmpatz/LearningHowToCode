export default class Level {
    constructor(id, title, istructions, blocksAvailable, rocketPosition, checkPoints, stepsStars, characterList, animCharacter = null) {
        this.id = id;
        this.istructions = istructions;
        this.blocksAvailable = [...blocksAvailable];
        this.rocketPosition = rocketPosition; //[x,y]
        this.checkPoints = [...checkPoints];//[(x,y,item = null), (x,y)]
        this.stepsStars = [...stepsStars];
        this.characterList = [...characterList];//[[name, row, column, orientation],[name, row, column, orientation]]
        this.animCharacter = [animCharacter]; // [[name ,x1,y1 ,x2,y2 ] ,[name, x1,y1,x2,y2]]
        this.title = title;
    }

    getTitle(){ return this.title; }

    getIstructions(){ return this.istructions; }

    getBlocks(){ return this.blocksAvailable; }


    getRocketPosition(){ return this.rocketPosition; }

    getCheckPoints(){ return this.checkPoints; }

    getStepsStars() { return this.stepsStars; }

    getCharacterList(){ return this.characterList; }

    getAnimCharacter() { return this.animCharacter; }
}