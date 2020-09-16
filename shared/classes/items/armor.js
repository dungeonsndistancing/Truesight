const Item = require('./item')
class Armor extends Item {
    constructor(name,type,cost,weight,description,ac,strength,stealth,icon,color) {
        super(name,type,cost,weight,description,icon,color)
        this.class = 'armor'
        this.ac = ac
        this.strength = strength
        this.stealth = stealth
    }
    display() {
        var x = super.display();
        x.ac = this.ac
        x.strengh = this.strength
        x.stealth = this.strength
        return x
    }

    equals(item) {
        return item.class == "armor" &&
        super.equals(item) && item.ac == this.ac &&
        item.strength == this.strength && item.stealth == this.stealth
    }

    static from(json) {
        return Object.assign(new Armor(), json)
    }
} 

module.exports = Armor