const Item = require('./item')
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
        return Object.assign(new Inventory(),json)
    }
}
module.exports = Inventory