<template>
  <div class='content'>
    <looks :looks='character.looks' @update='update' />
    <name :name='character.name' @update='update' />
    <general :character='character' @update='update' />
    <backgroundinfo :backgroundinfo='character.backgroundinfo' @update='update' />
    <backstory :backgroundinfo='character.backgroundinfo' @update='update' />
    <allies :backgroundinfo='character.backgroundinfo' @update='update' />
  </div>
</template>

<script>
import name from '../../components/CharacterSheet/background/Name'
import looks from '../../components/CharacterSheet/background/Looks'
import general from '../../components/CharacterSheet/background/General'
import backgroundinfo from '../../components/CharacterSheet/background/BackgroundInfo'
import backstory from '../../components/CharacterSheet/background/Backstory'
import allies from '../../components/CharacterSheet/background/Allies'
export default {
  props: ['character'],
  components: {
    looks,
    name,
    general,
    backgroundinfo,
    backstory,
    allies
  },
  methods: {
    update(data) {
      this.$emit('update',data)
    }
  }
}
</script>

<style>

</style>