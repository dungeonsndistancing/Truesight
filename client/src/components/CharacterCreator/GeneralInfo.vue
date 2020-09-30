<template>
    <div class='generalinfo'>
    Character name:<br><input type='text' class='wide input topside' v-model='character.name'>
    <h1>Class</h1>
    Class:<br><input type='text' class='wide input topside' v-model='character.cclass[0].name'><br>
    subclass:<br><input type='text' class='wide input' v-model='character.cclass[0].subclass'><br>
    level:<br><input type='number' class='small input' v-model='character.cclass[0].level'><br>

    hitdice:<br>{{character.cclass[0].level}}d<input type='number' class='small input' v-model='character.cclass[0].hitdice.dice'><br>
</div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style lang='scss' scoped>
.generalinfo{
    padding:1em;
}
input{
    margin:0;
}
h1{
    margin:0.2em;
}
</style>