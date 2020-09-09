<template>
  <div class='skills'>
      <h2 class='top'>Skills</h2>
      <div class='skill-card number'  v-for='skill in character.skills' :key='skill.name'>
          
          <h5> {{skill.name}} <i>({{skill.ability.substring(0,3)}})</i></h5>
          <h3 ><b v-if='skill.value(character.attributes[skill.ability].mod,character.proficiency) > 0'>+</b><b>{{skill.value(character.attributes[skill.ability].mod,character.proficiency)}}</b> <button>info</button></h3>

      </div>
  </div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style scoped>
.skills{
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start:4;
    grid-row-end:9;
    border:1px solid black;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows:0.3fr repeat(9,1fr);
    grid-gap:5px;
}
.top{
    grid-column-start:1;
    grid-column-end:3;
}
h2{
    margin:0;
}
h3{ margin:0}
h5{
    margin:0;
}
h6{
    margin:0;
}

</style>