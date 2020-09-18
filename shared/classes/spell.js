
class Spell{
    constructor(name,level,castingtime,duration,distance,attack,school,effect,components,description,concentration) {
        this.name = name
        this.level = level
        this.castingtime = castingtime
        this.duration = duration
        this.distance = distance
        this.attack = attack
        this.school = school
        this.effect = effect
        this.components = components
        this.description = description
        this.prepared = false
        this.concentration = concentration
    }

    static from(json) {
        return Object.assign(new Spell(),json)
    }

    equals(other) {
        return other.name == this.name && other.level == this.level
            && other.castingtime == this.castingtime && other.duration == this.duration
            && other.distance == this.distance && other.attack == this.attack
            && other.school == this.school && other.effect == this.effect
            && other.components == this.components && other.description == this.description
            && other.concentration == this.concentration
    }
}
module.exports=Spell