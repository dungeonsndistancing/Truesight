<template>
    <div class="charcontainer">
        <div class='tabcontainer'>
            
            <div class='tab' @click='load("general")' v-bind:class='{selected:page=="general"}'>General</div>
            <div class='tab' @click='load("inventory")' v-bind:class='{selected:page=="inventory"}'>Inventory</div>
            <div class='tab' @click='load("spells")' v-bind:class='{selected:page=="spells"}'>Spells & Abilities</div>
            <div class='tab' @click='load("background")' v-bind:class='{selected:page=="background"}'>Background</div>
        </div>

        <general v-if='page=="general"' class='content' @update='update' :character='character' />
        <inventory v-if='page=="inventory"' class='content' @update='update' :inventory='character.inventory' />
        <spells v-if='page=="spells"' class='content' @update='update' :character='character' />
        <background v-if='page=="background"' class='content' @update='update' :character='character' />
    </div>
</template>

<script>
import Character from '../../../shared/classes/character'
import characterService from '../services/CharacterService'
import general from '../views/CharacterSheet/General'
import inventory from '../views/CharacterSheet/Inventory'
import spells from '../views/CharacterSheet/Spells'
import background from '../views/CharacterSheet/Background'
import wsservice from '../services/WebsocketService'
export default {
    components: {
        general,
        inventory,
        spells,
        background
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
            const size = new TextEncoder().encode(JSON.stringify(this.character.inventory)).length
            const kiloBytes = size / 1024;
            console.log(kiloBytes)


        },
        update(data) {
            for(var i = 0; i < data.keys.length; i++) {
                this.character[data.keys[i]] = data.values[i]
            }
            wsservice.send('update',data)
        },
        start() {
            wsservice.send('character',this.char)
        },
        load(pg) {
            this.$router.push('/charsheet/' +this.char +'/' + pg)
        }

    },async beforeMount() {
        await this.getCharacter(this.char)
        await wsservice.link(this)
    },beforeDestroy() {
        console.log('leaving charsheet')
        wsservice.disconnect()
    }
}
</script>
<style lang='scss'>
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
.charcontainer > *{
    h5 {
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
    h1{
        margin:0;
    }
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
    margin: 0  0;
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
    overflow:hidden;
    padding:9px;
    display:grid;
    grid-template-columns: repeat(8,1fr); 
    grid-template-rows: repeat(8,1fr);
    row-gap: 10px;
    column-gap:10px;
    width:calc(100% - 20px);
    height:calc(100vh - 9vh - 5vh);
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