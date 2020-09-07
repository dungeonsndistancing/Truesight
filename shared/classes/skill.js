const Modifier = require('./stats/modifier')
class Skill {
    constructor(name,ability,proficiency) {
        this.name=name
        this.ability = ability
        this.proficiency = proficiency
        this.modifiers = []
    }

    value(ability,proficiency) {
        var sum = this.modifiers.reduce(function(a,b){return a + parseInt(b.value)},parseInt(0))
        return parseInt(ability) + parseInt(sum) + parseInt(this.proficiency * parseInt(proficiency))
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
module.exports = Skill