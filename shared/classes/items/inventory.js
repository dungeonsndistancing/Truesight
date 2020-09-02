const Item = require('./items/item')
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
}
var inv = new Inventory()
inv.add(new Item('pony','type','cost','weight','description'))
inv.add(new Item('pony2','type','cost','weight','description'))
inv.add(new Item('pony3','type','cost','weight','description'))
console.log(inv.remove(new Item('ponysd2','type','cost','weight','description')))
console.log(inv)
module.exports = Inventory