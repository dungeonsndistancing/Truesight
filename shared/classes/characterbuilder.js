const Character = require('./character')
class Characterbuilder{
    constructor(name) {
        this.name = name
        this.movement = 0
        this.proficiencyModifier = 0
        this.ac = 0
        this.experience = 0
        this.maxhp = 0
        this.temporaryhp = 0
        this.currenthp = 0

    }
    withCclass(cclass) {
        this.cclass = cclass
    }
    withTraits(traits) {
        this.traits = traits
    }
    withCounters(counters) {
        this.counters = counters
    }
    withRace(race) {
        this.race = race
    }
    withBackgrond(background) {
        this.background = background
    }
    withAlignment(alignment) {
        this.alignment = alignment
    }
    withExperience(experience) {
        this.experience = experience
    }
    withMoney(money) {
        this.money = money
    }
    withProficiencyModifier(profiencymod){
        this.proficiencyModifier = profiencymod
    }
    withAttributelist(attributelist) {
        this.attributelist = attributelist
    }
    withSavingthrows(savingthrows) {
        this.savingthrows = savingthrows
    }
    withSkills(skills) {
        this.skills = skills
    }
    withAc(ac) {
        this.ac = ac
    }
    withInitiative(initiative) {
        this.initiative = initiative
    }
    withMovement(movement) {
        this.movement = movement
    }
    withHp(hp) {
        this.maxhp = hp
        this.currenthp = hp
    }
    withSpells(spells) {
        this.spells = spells
    }
    withEffects(effects) {
        this.effects = effects
    }
    withBackgroundinfo(backgroundinfo) {
        this.backgroundinfo = backgroundinfo
    }
    withInventory(inventory) {
        this.inventory = inventory
    }
    withAttacks(attacks) {
        this.attacks = attacks
    }
    build() {
        return new Character(this)
    }

}