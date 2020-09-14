
class Message {
    constructor(type,data) {
        this.type = type
        this.data = data
    }

    static from(json) {
        return Object.assign(new Message(),json)
    }
}
module.exports= Message