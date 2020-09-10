
class Attack{
    constructor(name,attack,damage,extra) {
        this.name = name
        this.attack = attack
        this.damage = damage
        this.extra = extra
    }
    static from(json) {
        return Object.assign(new Attack(),json)
    }
}
module.exports=Attack