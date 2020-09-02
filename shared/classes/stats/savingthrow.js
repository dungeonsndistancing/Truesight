const Modifier = require('./modifier')
class Savingthrow{
    constructor(proficiency) {
        this.proficiency = proficiency
        this.modifiers = []
    }

    bonus(proficiency) {
        var sum = this.modifiers.reduce(function(a,b){return a + b.value},0)
        return sum + this.proficiency * proficiency
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
}
module.exports = Savingthrow