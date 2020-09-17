<template>
    <div class='known'>
        <h2>Known Spells/Abilities</h2>
        <div v-for='(spell,id) in spells' :key='id'>{{spell.name}}</div>
        <div class='buttonclass'>
            <button @click='addSpell()'>Add new Spell</button>
            <div v-if='show' class='addspell'>
                <div>name:<br><input class='input' v-model='editspell.name' type='text'></div>
                <div>level:<br><input class='input small' v-model='editspell.level' type='number'></div>
                <div>Casting time:<br><input class='input' v-model='editspell.castingtime' type='text'></div>
                <div>Duration:<br><input class='input' v-model='editspell.duration' type='text'></div>
                <div>Range/Area:<br><input class='input' v-model='editspell.distance' type='text'></div>
                <div>Attack/Save:<br><input class='input' v-model='editspell.attack' type='text'></div>
                <div>School:<br><input class='input' v-model='editspell.school' type='text'></div>
                <div>Damage/Effect:<br><input class='input' v-model='editspell.effect' type='text'></div>
                <div>Components:<br><input class='input' v-model='editspell.components' type='text'></div>
                <div>Concentration:<input class='input' v-model='editspell.concentration' type='checkbox'></div>
                <div>Description:<br><textarea v-model='editspell.description'></textarea></div>
                <div><button @click='save()'>Save</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import Spell from '../../../../shared/classes/spell'
export default {
    props:{
        spells:Array,
    },
    data: function() {
        return {
            show:false,
            editspell:new Spell('',1,'','','','','','','','',true)
        }
    }, methods: {
        addSpell() {
            this.show=true
        },
        save() {
            this.spells.push(this.editspell)
            this.editspell = new Spell('',1,'','','','','','','','',true)
            this.show = false
        },
        update() {
            this.$emit('update',{keys:['spells'],values:[this.spells]})
        }
    }
}
</script>

<style>
.buttonclass{
    position: absolute;
    bottom:0;
    width:90%;
    left:0;
    right:0;
    margin:0 auto;
}
.known{
    position: relative;
    border:1px solid black;
    grid-column-start: 1;
    grid-column-end:3;
    grid-row-start:1;
    grid-row-end:9
}
.addspell{
    position:absolute;
    border:1px solid black;
    width:100%;
    bottom:0;
    left:0;
    right:0;
    margin:0 auto;
    background-color:white;
}
textarea{
    width:90%;
    height:20vh;
    resize: none;
}
</style>