
class Money{
    constructor(cp,sp,gp,pp) {
        this.cp = cp
        this.sp = sp
        this.gp = gp
        this.pp = pp
    }

    static from(json) {
        return Object.assign(new Money(), json)
    }
}
module.exports = Money