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
        } else {
            console.log('cant find item to remove')
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
            this.add(this.equipped.splice(x, 1)[0])
        }
    }

    get weight() {
        var x = 0;
        for(var i = 0;i < this.backpack.length;i++){
            x += this.backpack[i].count * this.backpack[i].weight
        }
        for(var i = 0;i < this.equipped.length;i++){
            x += this.backpack[i].count * this.equipped[i].weight
        }
        return x
    }
    get attuned() {
        var attun = []
        for(var i = 0;i < this.backpack.length;i++){
           if(this.backpack[i].attuned) {
               attun.push(this.backpack[i])
           }
        }
        for(var i = 0;i < this.equipped.length;i++){
            if(this.equipped[i].attuned) {
                attun.push(this.equipped[i])
            }
        }
        return attun
    }

    static from(json){
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