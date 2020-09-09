<template>
    <div id="container">
        <div class='tabcontainer'>
            <div class='tab selected'>General</div>
            <div class='tab'>Battle</div>
            <div class='tab'>Inventory</div>
            <div class='tab'>Spells</div>
            <div class='tab'>Background</div>
        </div>
        <div class='content'>
            <name :name='character.name'/>
            <cclass :cclass='character.cclass'/>
            <general :character='character' />
            <attributes :attributes='character.attributes'/>
            <savingthrows :character='character'/>
            <battle :character='character'/>
        </div>
    </div>
</template>

<script>
import characterService from '../services/CharacterService'
import name from '../components/CharacterSheet/Name'
import general from '../components/CharacterSheet/General'
import attributes from '../components/CharacterSheet/Attributes'
import savingthrows from '../components/CharacterSheet/Savingthrows'
import cclass from '../components/CharacterSheet/Cclass'
import battle from '../components/CharacterSheet/Battlestats'
export default {
    components: {
        name,
        general,
        attributes,
        savingthrows,
        cclass,
        battle
    },
    props: ['char','page'],
    data: function() {
        return {
            character: null
            }
            
    },
    methods: {
        async getCharacter(id) {
            console.log(id)
            var temp = await characterService.getCharacter(id)
            if(temp == '403') {
                this.$router.push('/403')
            }
            this.character = temp;
        }

    },beforeMount() {
        console.log(this.char)
        this.getCharacter(this.char)
    }
}
</script>
<style>
h5{
    margin-bottom:0;
}
</style>
<style scoped>

.container{
    height:100%;
}
.tabcontainer{
    height:calc(3em);
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
    height:3em;
    padding:0;
    margin: 0 3% 0 3%;
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
    grid-template-columns: repeat(6,1fr); 
    grid-template-rows: repeat(8,1fr);
    row-gap: 10px;
    column-gap:10px;
    width:calc(100% - 20px);
    height:calc(100vh - 80px - 3em);
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