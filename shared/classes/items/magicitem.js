const Item = require('./item')
class MagicItem extends Item {
    constructor(item) {
        super(item)
        this.class='magicitem'
        this.rarity =item.rarity
        this.attunement = item.attunement
        this.attuned = item.attunement?item.attunement:false
    }

    display(){
        var x = super.display()
        x.rarity = this.rarity
        x.attunement = this.attunement
        return x
    }

    equals(item) {
        return super.equals(item) && item.rarity == this.rarity &&
        item.attunement == this.attunement
    }

    static from(json) {
        return Object.assign(new MagicItem(), json)
    }
}
module.exports = MagicItem