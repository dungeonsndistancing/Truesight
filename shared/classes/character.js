const BackgroundInfo = require('./stats/backgroundinfo')
const Money = require('./money')
const Attribute = require('./stats/attribute')
const SavingThrow = require('./stats/savingthrow')
const Skill = require('./skill')
const Feature = require('./feature')
const Proficiency = require('./proficiency')
class Character {
        constructor() {
            this.name = ''
            this.class = {
                name:'',
                subclass:'',
                level:1,
                hitdice:{
                    current:1,
                    dice:8
                }
            }
            this.looks = {
                age:0,
                weight:0,
                height:'',
                eyes:'',
                skin:'',
                hair:'' 
            }
            this.traits = []
            this.counters = []
            this.race = ''
            this.background =''
            this.alignment =''
            this.experience = 0
            this.money = new Money(0,0,0,0)
            this.proficiency = 0
            this.attributes = {
                strength:new Attribute('str',10),
                dexterity:new Attribute('dex',10),
                constitution:new Attribute('con',10),
                intelligence:new Attribute('int',10),
                wisdom:new Attribute('wis',10),
                charisma:new Attribute('cha',10)
            }
            this.savingthrows = {
                strength: new SavingThrow(0),
                dexterity: new SavingThrow(0),
                constitution: new SavingThrow(0),
                intelligence: new SavingThrow(0),
                wisdom: new SavingThrow(0),
                charisma: new SavingThrow(0)
            }
            this.skills = [
                new Skill('Acrobatics','dexterity',0),
                new Skill('Animal Handling','wisdom',0),
                new Skill('Arcana','intelligence',0),
                new Skill('Athletics','strength',0),
                new Skill('Deception','charisma',0),
                new Skill('History','intelligence',0),
                new Skill('Insight','wisdom',0),
                new Skill('Intimidation','charisma',0),
                new Skill('Investigation','intelligence',0),
                new Skill('Medicine','wisdom',0),
                new Skill('Nature','intelligence',0),
                new Skill('Perception','wisdom',0),
                new Skill('Performance','charisma',0),
                new Skill('Persuasion','charisma',0),
                new Skill('Religion','intelligence',0),
                new Skill('Sleight of Hand','dexterity',0),
                new Skill('Stealth','dexterity',0),
                new Skill('Survival','wisdom',0)
            ]
            this.proficiencies = []
            this.ac = 10
            this.initiative = 0
            this.movement = 30
            this.maxhp = 0
            this.currenthp = 0
            this.temporaryhp = 0
            this.spellsave = 0
            this.spellattack = 0
            this.spells = []
            this.effects = []
            this.backgroundinfo = new BackgroundInfo()
            this.inventory = []
            this.attacks = []
        } 
        newFeature() {
            this.traits.push(new Feature())
        }
        removeFeature(trait) {
            var x = this.traits.indexOf(trait)
            this.traits.splice(x,1)
        }
        newProficiency() {
            this.proficiencies.push(new Proficiency())
        }
        removeProficiency(proficiency) {
            var x = this.proficiencies.indexOf(proficiency)
            this.proficiencies.splice(x,1)
        }
}

module.exports = Character