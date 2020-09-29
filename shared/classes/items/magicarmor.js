const MagicItem = require('./magicitem')
class MagicArmor extends MagicItem {
    constructor(item) {
        super(item)
        this.class = 'magicarmor'
        this.ac = item.ac
        this.strength = item.strength
        this.stealth = item.stealth
    }
    display(){
        var x = super.display()
        x.ac = this.ac
        x.strength = this.strength
        x.stealth = this.stealth
        return x
    }

    equals(item) {
        return item.class == "magicarmor" &&
        super.equals(item) && item.ac == this.ac &&
        item.strength == this.strength && item.stealth == this.stealth
    }

    static from(json) {
        return Object.assign(new MagicArmor(), json)
    }
}
module.exports=MagicArmor