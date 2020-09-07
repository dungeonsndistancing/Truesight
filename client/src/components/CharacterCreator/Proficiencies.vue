<template>
    <div class='proficiencies list'>
        <h1>Additional Proficiencies</h1>
        <div class='featurecard' v-for='proficiency in character.proficiencies' :key='proficiency.id'>
            Name:<input class='wide input' type='text' v-model='proficiency.name'><br>
            Description:<textarea v-model='proficiency.description'>hi</textarea>
            <button @click='character.removeProficiency(proficiency)'>Remove Feature</button>
        </div>
        <button @click='character.newProficiency()'>Add Trait/Feature</button>
    </div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style>
.featurecard{
    padding:0.3em 0 0.8em 0;
    border-bottom:1px solid rgb(170, 170, 170);
}
</style>