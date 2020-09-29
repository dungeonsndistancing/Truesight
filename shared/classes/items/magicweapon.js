const MagicItem = require('./magicitem')
class MagicWeapon extends MagicItem {

    constructor(item) {
        super(item)
        this.class='magicweapon'
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
        return item.class == "magicweapon" &&
        super.equals(item) && this.damage == item.damage &&
        this.properties == item.properties
    }
    static from(json) {
        return Object.assign(new MagicWeapon(), json)
    }

}
var weap = new MagicWeapon('name')
module.exports = MagicWeapon