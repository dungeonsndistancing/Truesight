
class Feature{
    constructor(name, source, description){
        this.name = name
        this.source = source
        this.description = description
    }

    static from(json) {
        return Object.assign(new Feature(),json)
    }
}
module.exports = Feature