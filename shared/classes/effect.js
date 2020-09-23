
class Effect{
    constructor(name,icon,description) {
        this.name = name
        this.icon = icon
        this.description = description
    }

    static from(json) {
        return Object.assign(new Effect(),json)
    }
}
module.exports=Effect