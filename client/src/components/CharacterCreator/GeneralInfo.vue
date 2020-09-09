<template>
    <div class='general'>
    name:<input type='text' class='wide input topside' v-model='character.name'>
    <h1>Class</h1>
    Classname:<input type='text' class='wide input topside' v-model='character.cclass.name'><br>
    subclass:<input type='text' class='wide input' v-model='character.cclass.subclass'><br>
    level:<input type='number' class='small input' v-model='character.cclass.level'>

    hitdice: {{character.cclass.level}}d<input type='number' class='small input' v-model='character.cclass.hitdice.dice'><br>
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

    <h1>Combat Stats</h1>
    ac:<input type='number' class='small input' v-model='character.ac'>
    initiative:<input type='number' class='small input' v-model='character.initiative'><br>
    speed:<input type='number' class='small input' v-model='character.speed'>
    proficiency:<input type='number' class='small input' v-model='character.proficiency'><br>
    max HP:<input type='number' class='small input' v-model='character.maxhp'><br>
    spell save:<input type='number' class='small input' v-model='character.spellsave'>
    spell attack:<input type='number' class='small input' v-model='character.spellattack'>
    <h1>Moneyz</h1>
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