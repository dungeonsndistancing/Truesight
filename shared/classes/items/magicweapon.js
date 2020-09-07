const MagicItem = require('./magicitem')
class MagicWeapon extends MagicItem {

    constructor(name,type,cost,weight,description,rarity,attunement,damage,properties,icon,color) {
        super(name,type,cost,weight,description,rarity,attunement,icon,color)
        this.class='magicweapon'
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
        return item.constructor.name == "MagicWeapon" &&
        super.equals(item) && this.damage == item.damage &&
        this.properties == item.properties
    }
    static from(json) {
        return Object.assign(new MagicWeapon(), json)
    }

}
var weap = new MagicWeapon('name')
module.exports = MagicWeapon