<template>
    <div class='general'>
        <div class='clickable' @click='backshow=true'>
            <h3>Background</h3>
            <b v-if='!backshow'>{{character.background}}</b>
            <div v-if='backshow'>
                <input v-model='character.background' class='input medium'>
                <button @click.stop='backshow=false;update()'>Save</button>
            </div>
        </div>
        <div class='clickable' @click='raceshow=true'>
            <h3>Race</h3>
            <b v-if='!raceshow'>{{character.race}}</b>
            <div v-if='raceshow'>
                <input v-model='character.race' class='input medium'>
                <button @click.stop='raceshow=false;update()'>Save</button>
            </div>
        </div>
        <div class='clickable' @click='alshow=true'>
            <h3>Alignment</h3>
            <b v-if='!alshow'>{{character.alignment}}</b>
            <div v-if='alshow'>
                <input v-model='character.alignment' class='input small'>
                <button @click.stop='alshow=false;update()'>Save</button>                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['character'],
    data: function() {
        return {
            backshow:false,
            raceshow:false,
            alshow:false
        }
    },
    methods: {
        update() {
            this.$emit('update',
                {keys:['background','race','alignment'],
                values:[this.character.background,this.character.race,this.character.alignment]
            })
        }
    }
}
</script>

<style>
.general{
    display:grid;
    grid-template-columns:repeat(3,33.3%);
    grid-column-start:3;
    grid-column-end:6;
    grid-row-start:1;
    grid-row-end:2;
    border: 1px solid black;
    font-size:1.5vw;
    font-weight: bolder;
}
h4{
    margin:0;
}
</style>