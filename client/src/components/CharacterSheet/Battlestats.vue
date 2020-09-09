<template>
  <div class='battle'>
      <div class='stat'><h5>Armor Class</h5><h2>{{character.ac}}</h2></div>
      <div class='stat'><h5>Initiative</h5><h2><b v-if='character.initiative > 0'>+</b>{{character.initiative}}</h2></div>
      <div class='stat'><h5>Speed</h5><h2>{{character.movement}} ft</h2></div>
      <div class='stat'><h5>Proficiency Bonus</h5><h2>+{{character.proficiency}}</h2></div>
      <div class='stat'><h5>Max Health</h5><h2>{{character.maxhp}}</h2></div>
      <div class='stat'><h5>Current Health</h5><h2>{{character.currenthp}}</h2></div>
      <div class='stat'><h5>Temporary Health</h5><h2>{{character.temporaryhp}}</h2></div>
      <div class='stat'><h5>Passive Perception</h5><h2>{{character.passivePerception}}</h2></div>
  </div>
</template>

<script>
export default {
    props:['character'],
    methods: {
    }
}
</script>

<style scoped>
.battle{
    display:grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: 1fr 1fr;
    row-gap:10px;
    column-gap:10px;
    grid-column-start:1;
    grid-column-end:3;
    grid-row-start:2;
    grid-row-end:5;

}
.stat{
    border: 1px solid black;
}
</style>