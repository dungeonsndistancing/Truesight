const Modifier = require('./modifier')
class Savingthrow{
    constructor(proficiency) {
        this.proficiency = proficiency
        this.modifiers = []
    }

    bonus(base,proficiency) {
        var sum = this.modifiers.reduce(function(a,b){return a + parseInt(b.value)},parseInt(0))
        return parseInt(sum) + parseInt(base) + this.proficiency * parseInt(proficiency)
    }

    addmodifier(name,value,source) {
        this.modifiers.push(new Modifier(name,value,source))
    }

    removemodifier(name,source) {
        var index = this.modifiers.findIndex(o => o.name == name && o.source == source)
        if(index >= 0) {
            this.modifiers.splice(index,1)
        }
    }

    static from(json) {
        return Object.assign(new Savingthrow(), json)
    }
}
module.exports = Savingthrow