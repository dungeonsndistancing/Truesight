<template>
    <div class='prepared'>
        <h2>Prepared Spells/Abilities</h2>
        <div class='scroll' @dragover="allowDrop($event)" @drop='drop($event)'>
            <div class='clickable spell' @click='showSpell(id)' v-for='(spell,id) in preparedSpells'  :key='id' draggable="true" @dragstart="drag($event,id)">
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
                    <div class='spell-buttons'><button @click.stop='unprepare(id)'>Un-Prepare</button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        spells:Array,
    },
    data: function() {
        return {
            show:false,
            showid:-1
        }
    },
    computed: {
        preparedSpells: function() {
            if(typeof this.spells !== 'undefined') {
                var x = []
                for(let i = 0; i < this.spells.length;i++) {
                    console.log(this.spells[i])
                    if(this.spells[i].prepared) {
                        x.push(this.spells[i])
                    }
                }
                x.sort((a,b) => {
                    if(a.level < b.level) {
                        return -1
                    }
                    else if(b.level > a.level) {
                        return 1
                    }
                    return 0
                })
                return x
            }
            return []
        }
    },
    methods: {
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
        unprepare(id) {
            const index = this.spells.findIndex(o => o.equals(this.preparedSpells[id]))
            this.spells[index].prepared = false
            this.update(index,this.spells[index])
        },
        allowDrop(ev) {
            ev.preventDefault()
        },
        drag(ev,id) {
            const index = this.spells.findIndex(o => o.equals(this.preparedSpells[id]))
            ev.dataTransfer.setData('id',index)
            ev.dataTransfer.setData('task','unprepare')
        },
        drop(ev) {
            if(ev.dataTransfer.getData('task') === 'prepare') {
                let id = parseInt(ev.dataTransfer.getData('id'))
                this.spells[id].prepared = true
                this.update(id,this.spells[id])
            }
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../../../scss/variables';
.spell:nth-child(odd) {
    background-color:$list-dark;
}
.spell:hover{
    background-color:$selecting
}
.scroll{
    height:85%;
    overflow-y:scroll;
}
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
.prepared{
    position: relative;
    border:1px solid $border-color;
    border-radius:$border-radius;
    background-color:white;
    grid-column-start: 4;
    grid-column-end:7;
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
    .prepared {
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:1;
        grid-row-end:9
    }
    .spellname{
        font-size:2vw;
    }
}
@media only screen and (max-width:$small-screen) {
    .prepared {
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:2;
        grid-row-end:10;
    }
}
</style>