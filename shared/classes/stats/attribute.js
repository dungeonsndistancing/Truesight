const Modifier = require('./modifier')
class Attribute {

    constructor(name,base) {
        this.name = name
        this.base = base
        this.modifiers = []
    }

    get value() {
        var sum = this.modifiers.reduce(function(a,b){return a + parseInt(b.value)},parseInt(0))
        return parseInt(sum) + parseInt(this.base)
    }

    get mod() {
        var x = Math.floor((this.value - 10)/2)
        return x
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