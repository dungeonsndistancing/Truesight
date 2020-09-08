class Backgroundinfo{
    constructor() {
        this.notes = ''
        this.ideals = ''
        this.bonds = ''
        this.flaws = ''
        this.story = ''
        this.features = ''
        this.trinket = ''

    }

    static from(json) {
        return Object.assign(new Backgroundinfo(),json)
    }
}
module.exports = Backgroundinfo