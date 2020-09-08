
class Effect{
    constructor() {

    }

    static from(json) {
        return Object.assign(new Effect(),json)
    }
}
module.exports=Effect