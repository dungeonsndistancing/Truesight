<template>
    <div class='known'>
        <h2>Known Spells/Abilities</h2>
        <div class='clickable spell clickable' @click='showSpell(id)' v-for='(spell,id) in sortedspells' :key='id'>
            <div class='spell-upper'>
                <div class='spellname'>{{spell.name}} <img v-if='spell.concentration' class='concentration' src='../../../assets/icons/concentration.svg'></div>
                <div class='spelllevel'>
                    <h5>{{spell.level}}<i v-if="spell.level == parseInt(1)" >st</i>
                    <i v-else-if="((spell.level > 3 && spell.level < 21) || spell.level == 0)" >th</i>
                    <i v-else-if="spell.level == 2">nd</i>
                    <i v-else>rd</i>
                    level {{spell.school}}<i>  ({{spell.components}})</i></h5>
                </div>
                <div class='action'><h5>Casting:{{spell.castingtime}}</h5></div>
                <div class='distance'><h5>Distance: {{spell.distance}}</h5></div>
                <div class='attack'><h5>Attack/Save: {{spell.attack}}</h5></div>
            </div>
            <div class='extra-spell' v-if='showid == id'>
                <div class='extra-upper'>
                    <div><h5>Duration:{{spell.duration}}</h5></div>
                    <div><h5>Effect/Damage:{{spell.effect}}</h5></div>
                </div>
                <div class='spell-description'>{{spell.description}}</div>
                <div class='spell-buttons'><button @click.stop='edit(id)'>Edit</button><button v-if='!spell.prepared' @click='prepareSpell(id)'>Prepare</button></div>
            </div>
        </div>
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
                <div><button @click='save()'>Save</button><button v-if='editing' @click='remove()'>Delete</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import Spell from '../../../../../shared/classes/spell'
export default {
    props:{
        spells:Array,
    },
    data: function() {
        return {
            show:false,
            editspell:new Spell('',1,'','','','','','','','',true),
            showid:-1,
            editing:false,
            editid:-1
        }
    },
    computed: {
        sortedspells: function() {
            if(typeof this.spells === 'undefined') {
                return new Array()
            }
            return this.spells.slice().sort((a,b) => {
                if(a.level < b.level) {
                    return -1
                }
                else if(b.level > a.level) {
                    return 1
                }
                return 0
            })
        }
    }, 
    methods: {
        addSpell() {
            this.show=true
        },
        save() {
            if(!this.editing){
                this.update(this.spells.length,this.editspell)
            } else {
                var index = this.spells.indexOf(this.editspell)
                this.update(index,this.editspell)
                this.editid = -1
                this.editing = false
            }  
            this.editspell = new Spell('',1,'','','','','','','','',true)
            this.show = false
        },
        update(id,spell) {
            var temp = {spells:{}}
            temp.spells[id] = spell
            this.$emit('update',[{task:'update',data:temp}])
        },
        showSpell(id) {
            if(this.showid == id) {
                this.showid = -1
            } else {
                this.showid = id
            }
        },
        edit(id) {
            this.editspell = this.sortedspells[id]
            this.editing = true
            this.editid = id
            this.addSpell()
        },
        remove() {
            var index = this.spells.indexOf(this.editspell)
            var temp = {spells:[]}
            temp.spells.push(index)
            this.$emit('update',[{task:'remove',data:temp}])
            this.editid= -1
            this.editing = false
            this.show = false
            this.editspell = new Spell('',1,'','','','','','','','',true)
        },
        prepareSpell(id) {
            this.sortedspells[id].prepared = true
            var index = this.spells.indexOf(this.sortedspells[id])
            this.update(index,this.sortedspells[id])
        }
    }
}
</script>
<style>
.spell:nth-child(even) {
    background-color:rgb(216, 216, 216);
}
</style>
<style lang='scss' scoped>
@import '../../../scss/variables';
.extra-upper{
    display:grid;
    grid-template-columns: 1fr 1fr;
    border-bottom:1px solid black;
    line-height:2em;
}
.spell-description{
    padding:0 0.4em;
    text-align:left;
    white-space:pre-wrap;
    padding-bottom:0.5em;
}
.concentration{
    height:0.6em;
}
.attack{
    padding-left:1em;
    border-right:1px solid black;
    text-align:left;
    grid-column-start: 2;
    grid-column-end:3;
    grid-row-start:2;
    grid-row-end:3;
}
.action{
    padding-left:0.5em;
    text-align: left;
    grid-column-start: 3;
    grid-column-end:4;
    grid-row-start:1;
    grid-row-end:2;
}
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
    grid-column-end:4;
    grid-row-start:1;
    grid-row-end:9
}
.extra-spell{
    border-top: 1px solid black;
}
.distance{
    padding-left:0.5em;
    text-align: left;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-end:3;
    grid-row-start: 2;
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

.spell-upper{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows:1fr 1fr;
}
.spellname{
    font-size:1.2vw;
    font-weight: bold;
    padding: 0 0.2em;
    text-align: left;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
}
.spelllevel{
    border-right: 1px solid black;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: left;
    padding:0 0.2em;
}
textarea{
    width:90%;
    height:20vh;
    resize: none;
}
@media only screen and (max-width:$medium-screen) {
    .known {
        grid-column-start: 1;
        grid-column-end:5;
        grid-row-start:9;
        grid-row-end:18;
    }
    .spellname{
        font-size:2vw;
    }
}
@media only screen and (max-width:$small-screen) {
    .known {
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:15;
        grid-row-end:33;
    }
}
</style>