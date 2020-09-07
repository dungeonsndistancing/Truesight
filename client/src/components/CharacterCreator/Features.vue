<template>
    <div class='features list'>
    <h1>Traits & Features</h1>
    <div class='featurecard' v-for='trait in character.traits' :key='trait.id'>
        Name:<input class='wide input' type='text' v-model='trait.name'><br>
        Source:<input class='wide input' type='text' v-model='trait.source'><br>
        Description:<textarea v-model='trait.description'>hi</textarea>
        <button @click='character.removeFeature(trait)'>Remove Feature</button>
    </div>
    <button @click='character.newFeature()'>Add Trait/Feature</button>
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