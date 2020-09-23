
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

    add(pp,gp,sp,cp) {
        this.pp = parseInt(this.pp) + parseInt(pp)
        this.gp = parseInt(this.gp) + parseInt(gp)
        this.sp = parseInt(this.sp) + parseInt(sp)
        this.cp = parseInt(this.cp) + parseInt(cp)
    }
    remove(pp,gp,sp,cp) {
        this.pp -= pp
        this.gp -= gp
        this.sp -= sp
        this.cp -= cp
    }
    shift() {
        this.sp += Math.floor(this.cp / 10)
        this.cp = this.cp % 10
        this.gp += Math.floor(this.sp / 10)
        this.sp = this.sp % 10
        this.pp += Math.floor(this.gp / 10)
        this.gp = this.gp % 10
    }
}
module.exports = Money