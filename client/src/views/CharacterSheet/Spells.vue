<template>
    <div class='spells'>
        <known  @update='update' :spells='character.spells'/>
        <prepared @update='update' :spells='character.spells'/>
        <spellstats @update='update' :character='character'/>
        <counters class='spellcounters' @update='update' :counters='character.counters'/>
    </div>
</template>

<script>
import known from '../../components/CharacterSheet/Spells/Known'
import prepared from '../../components/CharacterSheet/Spells/Prepared'
import spellstats from '../../components/CharacterSheet/Spells/SpellStats'
import counters from '../../components/CharacterSheet/general/Counters'
export default {
    props: {
        character:Object
    },
    components: {
        known,
        prepared,
        spellstats,
        counters
    },
    methods: {
        update(data){
            console.log(data)
            this.$emit('update',data)
        }
    }
}
</script>

<style>
.spellcounters{
    grid-column-start: 7;
    grid-column-end:9;
}
</style>