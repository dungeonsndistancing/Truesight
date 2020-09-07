const Item = require('./item')
class MagicItem extends Item {
    constructor(name,type,cost,weight,description,rarity,attunement,icon,color) {
        super(name,type,cost,weight,description,icon,color)
        this.class='magicitem'
        this.rarity =rarity
        this.attunement = attunement
        this.attuned = false
    }

    display(){
        var x = super.display()
        x.rarity = this.rarity
        x.attunement = this.attunement
        return x
    }

    equals(item) {
        return item.constructor.name == "MagicItem" &&
        super.equals(item) && item.rarity == this.rarity &&
        item.attunement == this.attunement
    }

    static from(json) {
        return Object.assign(new MagicItem(), json)
    }
}
module.exports = MagicItem