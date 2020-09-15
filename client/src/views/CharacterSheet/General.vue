<template>
    <div>
        <name @update='update' :name='character.name' />
        <general @update='update' :character='character' />
        <attributes @update='update' :attributes='character.attributes' />
        <savingthrows @update='update' :character='character' />
        <cclass @update='update' :cclass='character.cclass' />
        <battle @update='update' :character='character' />
        <money @update='update' :money='character.money' />
        <skills @update='update' :character='character' />
        <attacks @update='update' :attacks='character.attacks'/>
        <features @update='update' :features='character.traits' />
        <proficiencies @update='update' :character='character' />
        <death @update='update' :character='character' />
        <counters @update='update' :counters='character.counters' />
        <effects @update='update' :effects='character.effects' />
    </div>
</template>

<script>
import name from '../../components/CharacterSheet/general/Name'
import general from '../../components/CharacterSheet/general/General'
import attributes from '../../components/CharacterSheet/general/Attributes'
import savingthrows from '../../components/CharacterSheet/general/Savingthrows'
import cclass from '../../components/CharacterSheet/general/Cclass'
import battle from '../../components/CharacterSheet/general/Battlestats'
import money from '../../components/CharacterSheet/general/Money'
import skills from '../../components/CharacterSheet/general/Skills'
import attacks from '../../components/CharacterSheet/general/Attacks'
import features from '../../components/CharacterSheet/general/Features'
import proficiencies from '../../components/CharacterSheet/general/Proficiencies'
import death from '../../components/CharacterSheet/general/Death'
import counters from '../../components/CharacterSheet/general/Counters'
import effects from '../../components/CharacterSheet/general/Effects'
export default {
    props:['character'],
    components: {
        name,
        general,
        attributes,
        savingthrows,
        cclass,
        battle,
        money,
        skills,
        attacks,
        features,
        proficiencies,
        death,
        counters,
        effects
    },methods: {
        update(data) {
            this.$emit('update',data)
        }
    }
}
</script>

<style scoped>
.general{
    overflow:hidden;
}
</style>