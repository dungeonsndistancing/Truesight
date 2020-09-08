<template>
  <div class='savingthrows'>
        <div class='save-title'><h3>Saving Throws</h3></div>
        <div class='save' v-for='(savingthrow,saveid) in character.savingthrows' :key='saveid'>
            <h5>{{saveid}}</h5>
            <h2><b v-if='savingthrow.bonus(character.attributes[saveid].mod,character.proficiency) > 0'>+</b>{{savingthrow.bonus(character.attributes[saveid].mod,character.proficiency)}}</h2>
            <h6><i v-if='savingthrow.proficiency == 1'>Proficient</i><i v-else-if='savingthrow.proficiency == 2'>Expert</i ></h6>
        </div>
  </div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style scoped>
.savingthrows{
    padding:5px;
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:5;
    grid-row-end:8;
    row-gap: 10px;
    column-gap: 10px;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows:0.5fr 2fr 2fr 2fr;
    background-color: rgb(228, 228, 228);
    
}
.save{
    border: 1px solid black;
    background-color:white;
}
.save-title{
    grid-column-start:1;
    grid-column-end:3;
}
h3{
    margin:0;
}
h5{
    margin-top:0.1em;

}
h6{
    margin:0;
}
h2{
    margin:0.1em auto 0.2em auto;
}
</style>