const Item = require('./item')
class Weapon extends Item{
    constructor(item){
        super(item)
        this.class='weapon'
        this.damage = item.damage
        this.properties = item.properties
    }
    display(){
        var x = super.display()
        x.damage = this.damage
        x.properties = this.properties
        return x
    }

    equals(item) {
        return item.class == "weapon" &&
        super.equals(item) && this.damage == item.damage &&
        this.properties == item.properties
    }
    static from(json) {
        return Object.assign(new Weapon(), json)
    }
}
module.exports = Weapon