<template>
    <div id="container">
        <div class='tabcontainer'>
            <div class='tab selected'>General</div>
            <div class='tab'>Inventory</div>
            <div class='tab'>Spells</div>
            <div class='tab'>Background</div>
        </div>
        <div class='content'>
            <name @update='update' :name='character.name'/>
            <cclass @update='update' :cclass='character.cclass'/>
            <general @update='update' :character='character' />
            <attributes @update='update' :attributes='character.attributes'/>
            <savingthrows @update='update' :character='character'/>
            <battle @update='update' :character='character'/>
            <money @update='update' :money='character.money' />
            <skills @update='update' :character='character' />
            <attacks @update='update' :attacks='character.attacks' />
            <features @update='update' :features='character.traits' />
            <proficiencies @update='update' :character='character' />
            <death @update='update' :character='character' />
            <counters @update='update' :counters='character.counters'/>
            <effects @update='update' :effects='character.effects' />
        </div>
    </div>
</template>

<script>
import Character from '../../../shared/classes/character'
import characterService from '../services/CharacterService'
import name from '../components/CharacterSheet/Name'
import general from '../components/CharacterSheet/General'
import attributes from '../components/CharacterSheet/Attributes'
import savingthrows from '../components/CharacterSheet/Savingthrows'
import cclass from '../components/CharacterSheet/Cclass'
import battle from '../components/CharacterSheet/Battlestats'
import money from '../components/CharacterSheet/Money'
import skills from '../components/CharacterSheet/Skills'
import attacks from '../components/CharacterSheet/Attacks'
import features from '../components/CharacterSheet/Features'
import proficiencies from '../components/CharacterSheet/Proficiencies'
import death from '../components/CharacterSheet/Death'
import counters from '../components/CharacterSheet/Counters'
import effects from '../components/CharacterSheet/Effects'
import wsservice from '../services/WebsocketService'
export default {
    components: {
        name,
        general,
        attributes,
        savingthrows,
        cclass,
        battle,
        money,
        skills,
        attacks,
        features,
        proficiencies,
        death,
        counters,
        effects
    },
    props: ['char','page'],
    data: function() {
        return {
            character: new Character()
            }
            
    },
    methods: {
        async getCharacter(id) {
            var temp = await characterService.getCharacter(id)
            if(temp == '403') {
                this.$router.push('/403')
            }
            this.character = temp;

        },
        update(data) {
            wsservice.send('update',data)
        },
        start() {
            wsservice.send('character',this.char)
        }

    },async beforeMount() {
        await this.getCharacter(this.char)
        await wsservice.link(this)
        console.log(wsservice)
    },beforeDestroy() {
        console.log('leaving charsheet')
        wsservice.disconnect()
    }
}
</script>
<style>
.scrollcontainer{
    border-style:solid none solid none;
    border-width:1px;
    height:55%;
    background-color:rgb(223, 223, 223);
    overflow-y: scroll;
}
.mod-div{
    padding:0.5em;
    margin:0.3em 15% 0.3em 15%;
    border:1px solid black;
}
h5{
    font-size:0.8vw;
    margin-top:0.2em;
}
h2{
    font-size:1.8vw;
    margin:0em;
}
h3{
    font-size:1.3vw;
    margin:0;
}
::-webkit-scrollbar {
    /* //Width of vertical scroll bar */
    width: 8px;
    /* // Height of horizontal scroll bar */
    height: 10px;

  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #c2c9d2;
  }
  .clickable:hover{
    background-color:rgb(240, 240, 240);
}
p{
    margin-bottom:0;
}
</style>
<style scoped>

.container{
    height:100%;
}
.tabcontainer{
    height:5vh;
    display:grid;
    grid-template-columns:repeat(5,20%);
    width:100%;
    border-bottom: 1px solid black;
    padding:0;
    margin:0;

}
.tab{
    border-radius: 2em 2em 0% 0%;
    border-style: solid solid none solid;
    border-width: 1px;
    font-size:1vw;
    height:5vh;
    padding:0;
    margin: 0 1% 0 1%;
    line-height: 3em;
    z-index:0;
    position:relative;
}
.tab:hover{
    -webkit-box-shadow: 6px 3px 14px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 6px 3px 14px -2px rgba(0,0,0,0.75);
    box-shadow: 6px 0px 14px -2px rgba(0,0,0,0.75);
    clip-path: inset(-5px -20px 0px -5px);
    background-color: rgb(245, 245, 245);
}
.content{
    padding:10px;
    display:grid;
    grid-template-columns: repeat(8,1fr); 
    grid-template-rows: repeat(8,1fr);
    row-gap: 10px;
    column-gap:10px;
    width:calc(100% - 20px);
    height:calc(100vh - 80px - 5vh);
    font-size:1vw;
}
.selected{
    border-bottom-style: none;
    -webkit-box-shadow: 6px 3px 14px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 6px 3px 14px -2px rgba(0,0,0,0.75);
    box-shadow: 6px 0px 14px -2px rgba(0,0,0,0.75);
    clip-path: inset(-5px -20px 0px -5px);
    background-color: white;
}


</style>