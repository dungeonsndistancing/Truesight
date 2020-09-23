class Backgroundinfo{
    constructor() {
        this.traits = ''
        this.ideals = ''
        this.bonds = ''
        this.flaws = ''
        this.story = ''
        this.features = ''
        this.trinket = ''
        this.allies = ''
        this.backstory = ''

    }

    static from(json) {
        return Object.assign(new Backgroundinfo(),json)
    }
}
module.exports = Backgroundinfo