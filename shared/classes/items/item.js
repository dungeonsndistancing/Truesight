class Item{
    constructor(name,type,cost,weight,description,icon,color){
        this.class = 'item'
        this.name = name
        this.type = type
        this.cost = cost
        this.weight = weight
        this.description = description
        this.icon = icon
        this.color = color
    }
    display(){
        return {}
    }

    equals(item) {
        return this.name == item.name && this.type == item.type &&
        this.cost == item.cost && this.weight == item.weight &&
        this.description == item.description
    } 
    static from(json) {
        return Object.assign(new Item(), json)
    }
}
module.exports = Item