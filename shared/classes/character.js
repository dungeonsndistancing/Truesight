const AttributeList = require('./stats/attributelist')
class Character {
        constructor(build) {
            this.name = build.name
            this.user = build.user
            this.cclass = build.cclass
            this.traits = build.traits
            this.counters = build.counters
            this.race = build.race
            this.background = build.background
            this.alignment = build.alignment
            this.experience = build.experience
            this.money = build.money
            this.proficiencyModifier = build.proficiencyModifier
            this.attributelist = build.attributelist
            this.savingthrows = build.savingthrows
            this.skills = build.skills
            this.ac = build.ac
            this.initiative = build.initiative
            this.movement = build.movement
            this.maxhp = build.maxhp
            this.currenthp = build.currenthp
            this.temporaryhp = build.temporaryhp
            this.spells = build.spells
            this.effects = build.effects
            this.backgroundinfo = build.backgroundinfo
            this.inventory = build.inventory
            this.attacks = build.attacks
        } 
}

module.exports = Character