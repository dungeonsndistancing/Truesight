
class Money{
    constructor(cp,sp,gp,pp) {
        this.pp = (typeof pp != 'undefined')?pp:0
        this.gp = (typeof gp != 'undefined')?gp:0
        this.sp = (typeof sp != 'undefined')?sp:0
        this.cp = (typeof cp != 'undefined')?cp:0
    }

    static from(json) {
        return Object.assign(new Money(), json)
    }
}
module.exports = Money