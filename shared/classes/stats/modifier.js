class Modifier {
    constructor(name, value,source) {
        this.name = name
        this.value = value
        this.source = source
    }

    static from(json) {
        return Object.assign(new Modifier(),json)
    }
}
module.exports=Modifier