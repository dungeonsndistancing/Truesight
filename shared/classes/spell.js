
class Spell{
    constructor() {

    }

    static from(json) {
        return Object.assign(new Spell(),json)
    }
}
module.exports=Spell