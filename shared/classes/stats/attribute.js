const Modifier = require('./modifier')
class Attribute {

    constructor(base) {
        this.base = base
        this.modifiers = []
    }

    get value() {
        var sum = this.modifiers.reduce(function(a,b){return a + b.value},0)
        return sum + this.base
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
module.exports = Attribute