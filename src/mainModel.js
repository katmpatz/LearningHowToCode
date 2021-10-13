class MainModel{
    constructor(levels=[], curentLevel=1){
        this.levels = [...levels];
        this.setCurentLevel(curentLevel);
        this.levelBlocks = [];
        this.levelCommands = [];
        this.observers = [];
    }

    setLevels(level){
        //set all the levels
        //let l1 = new Level(num, instructions, [new Block(,..), new Block(,..)],  [checkPoints]) 
    
    }

    setCurentLevel(l){
        this.curentLevel = x;
        this.levelBlocks = this.levelCommands = [];
        this.notifyObservers();
        if (this.curentLevel) {
            //b = getBlocks(l)
            //this.levelBlocks = [...b]
            this.notifyObservers();   
        }
    }

    setCommand(commands) {
        this.levelCommands = [...commands]
        this.notifyObservers();
    }


    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback) {
        this.observers = this.observers.filter(cb => cb !== callback);
    }

    notifyObservers() {
        this.observers.forEach(cb => {
            try {
                cb();
            } catch(error) {
                console.log(error);
            }})
    }

}