export default class Level {
    constructor(id, istructions, blocksAvailable, rocketPosition, checkPoints, characterList) {
        this.id = id;
        this.istructions = istructions;
        this.blocksAvailable = [...blocksAvailable];
        this.rocketPosition = rocketPosition; //[x,y]
        this.checkPoints = [...checkPoints];//[(x,y), (x,y)]
        this.characterList = [...characterList];//[[name, row, column, orientation],[name, row, column, orientation]]
    }

    getBlocks(){
        return this.blocksAvailable;
    }

    getRocketPosition(){
        return this.rocketPosition;
    }

    getCheckPoints(){
        return this.checkPoints;
    }

    getCharacterList(){
        return this.characterList;
    }
}