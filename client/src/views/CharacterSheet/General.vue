<template>
    <div>
        <name @update='update' :name='character.name' />
        <attributes @remove='remove' @update='update' :attributes='character.attributes' />
        <savingthrows @remove='remove' @update='update' :character='character' />
        <cclass @remove='remove' @update='update' :cclass='character.cclass' />
        <battle @update='update' :character='character' />
        <money @update='update' :money='character.money' />
        <skills @remove='remove' @update='update' :character='character' />
        <attacks @remove='remove' @update='update' :attacks.sync='character.attacks'/>
        <features @remove='remove' @update='update' :features='character.traits' />
        <proficiencies @remove='remove' @update='update' :character='character' />
        <death @remove='remove' @update='update' :character='character' />
        <counters @remove='remove' @update='update' :counters='character.counters' />
        <effects @remove='remove' @update='update' :effects='character.effects' />
        <experience @update='update' :experience='character.experience' />
    </div>
</template>

<script>
import name from '../../components/CharacterSheet/general/Name'
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
import experience from '../../components/CharacterSheet/general/Experience'
export default {
    props:['character'],
    components: {
        name,
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
        effects,
        experience

    },methods: {
        update(data) {
            this.$emit('update',data)
        },
        remove(data) {
            this.$emit('remove',data)
        }
    }
}
</script>

<style scoped>
.general{
    overflow:hidden;
}
</style>