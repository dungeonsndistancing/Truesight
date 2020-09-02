const Item = require('./item')
class Weapon extends Item{
    constructor(name,type,cost,weight,description,damage,properties,icon,color){
        super(name,type,cost,weight,description,icon,color)
        this.class='weapon'
        this.damage = damage
        this.properties = properties
    }
    display(){
        var x = super.display()
        x.damage = this.damage
        x.properties = this.properties
        return x
    }

    equals(item) {
        return item.constructor.name == "Weapon" &&
        super.equals(item) && this.damage == item.damage &&
        this.properties == item.properties
    }
    static from(json) {
        return Object.assign(new Weapon(), json)
    }
}
module.exports = Weapon