

export default class CommandModel {
    constructor(id, order, name, category, top, left, select) {
        this.id = id;
        this.name = name ;
        this.category = category;
        this.order = order;
        this.top = top;
        // this.isCommand = true;
        this.select = select;
    }

} 