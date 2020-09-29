<template>
    <div class='generalinfo'>
    Character name:<input type='text' class='wide input topside' v-model='character.name'>
    <h1>Class</h1>
    Class:<input type='text' class='wide input topside' v-model='character.cclass[0].name'><br>
    subclass:<input type='text' class='wide input' v-model='character.cclass[0].subclass'><br>
    level:<input type='number' class='small input' v-model='character.cclass[0].level'>

    hitdice: {{character.cclass[0].level}}d<input type='number' class='small input' v-model='character.cclass[0].hitdice.dice'><br>
    <h1>Description</h1>
    Race:<input type='text' class='wide input' v-model='character.race'><br>
    Background:<input type='text' class='wide input' v-model='character.background'><br>
    Alignment:<input type='text' class='small input' v-model='character.alignment'>
    Age:<input type='number' class='small input' v-model='character.looks.age'><br>
    Height:<input type='text' class='medium input' v-model='character.looks.height'>
    Weight:<input type='number' class='small input' v-model='character.looks.weight'><br>
    Eyes:<input type='text' class='medium input' v-model='character.looks.eyes'>
    Skin:<input type='text' class='medium input' v-model='character.looks.skin'><br>
    Hair:<input type='text' class='medium input' v-model='character.looks.hair'>

    <h1>Money</h1>
    pp:<input type='number' class='small input' v-model='character.money.pp'>
    gp:<input type='number' class='small input' v-model='character.money.gp'>
    sp:<input type='number' class='small input' v-model='character.money.sp'>
    cp:<input type='number' class='small input' v-model='character.money.cp'>
</div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style>

</style>