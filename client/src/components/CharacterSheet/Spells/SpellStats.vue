<template>
    <div class='spellstats'>
        <div class='block clickable' @click='showsave = !showsave;if(!showsave){update()}'>
            <h3>Spell Save</h3>
            <h2>{{character.spellsave}}</h2>
            <div @click.stop v-if='showsave' class='block-edit'>
                <input class='input small' v-model='character.spellsave'>
                <button @click.stop='showsave=false;update();'>Save</button>
            </div>
        </div>
        <div class='block clickable' @click='attacksave = !attacksave;if(!attacksave){update()}'>
            <h3>Spell Attack</h3>
            <h2><b v-if='character.spellattack > 0'>+</b>{{character.spellattack}}</h2>
            <div @click.stop  v-if='attacksave' class='block-edit'>
                <input class='input small'  v-model='character.spellattack'>
                <button @click='attacksave=false;update()'>Save</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props:{
        character:Object
    },
    data: function() {
        return {
            showsave:false,
            attacksave:false
        }
    },
    methods: {
        update() {
            console.log('update')
            this.$emit('update',{keys:['spellsave','spellattack'],values:[this.character.spellsave,this.character.spellattack]})
        },
        save() {
            
        }
    }
}
</script>
<style>
.block{
    position: relative;
    background-color:white;
    border:1px solid black;
}
</style>
<style scoped>
.spellstats {
    padding:10px;
    grid-column-start: 7;
    grid-column-end:9;
    grid-row-start:1;
    grid-row-end:2;
    background-color:rgb(197, 197, 197);
    display:grid;
    gap:10px;
    grid-template-columns: 1fr 1fr;
}
.block-edit{
    margin:1em;
    padding:1em;
    width:calc(90% - 2em);
    background-color:white;
    border:1px solid black;
    position:absolute;
    left:-0.5em;
    bottom:calc(-5vh - 3em);
    height:5vh;
}

h4{
    margin:0.3em;

}
</style>