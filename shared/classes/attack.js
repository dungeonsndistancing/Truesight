
class Attack{
    constructor() {

    }
    static from(json) {
        return Object.assign(new Attack(),json)
    }
}
module.exports=Attack