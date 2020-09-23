class Proficiency{
    constructor(name,description) {
        this.name = name
        this.description = description
    }

    static from(json) {
        return Object.assign(new Proficiency(), json)
    }
}
module.exports= Proficiency