const Item = require('./item')
const itemparser = require('../itemparser')
class Inventory {
    constructor() {
        this.backpack = []
        this.equipped = []
    }

    add(item) {
        if(item instanceof Item){
            this.backpack.push(item)
            return
        }
    }
    remove(item){
        var x = this.backpack.findIndex(o => o.equals(item))
        if(x >= 0){
            return this.backpack.splice(x, 1)[0]
        }
    }
    equip(item) {
        var it = this.remove(item)
        if(typeof it !== 'undefined') {
            this.equipped.push(item)
        }
    }
    unequip(item) {
        var x = this.equipped.findIndex(o => o.equals(item))
        if(x >= 0){
            add(this.equipped.splice(x, 1)[0])
        }
    }

    static from(json){
        console.log(json)
        var x =  Object.assign(new Inventory(),json)
        for(let i = 0; i < x.equipped.length;i++) {
            x.equipped[i] = itemparser.parse(x.equipped[i])
        }
        for(let i = 0; i <x.backpack.length;i++) {
            x.backpack[i] = itemparser.parse(x.backpack[i])
        }
        return x
    }
}
module.exports = Inventory