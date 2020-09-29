
class Cclass{
    constructor(name,subclass,level,hitdie) {
        this.name = name
        this.subclass = subclass
        this.level = level
        this.hitdice = {
            current:level,
            dice:hitdie
        }
    }

    static from(json) {
        return Object.assign(new Cclass(),json)
    }
}
module.exports=Cclass