<template>
    <div class="charcontainer">
        <div class='tabcontainer'>
            
            <div class='tab' @click='load("general")' v-bind:class='{selected:page=="general"}'>General</div>
            <div class='tab' @click='load("inventory")' v-bind:class='{selected:page=="inventory"}'>Inventory</div>
            <div class='tab' @click='load("spells")' v-bind:class='{selected:page=="spells"}'>Spells & Abilities</div>
            <div class='tab' @click='load("background")' v-bind:class='{selected:page=="background"}'>Background</div>
        </div>

        <general v-if='page=="general"' class='content' @remove='remove' @update='update' :character.sync='character' />
        <inventory v-if='page=="inventory"' class='content' @remove='remove' @update='update' :inventory.sync='character.inventory' />
        <spells v-if='page=="spells"' class='content' @remove='remove' @update='update' :character.sync='character' />
        <background v-if='page=="background"' class='content' @remove='remove' @update='update' :character.sync='character' />
        <transition name='fade'>
            <popup v-if='!connected'>
                <div class='popup'><h2>You are currently not connected!</h2>
                <br>
                <h3>Reconnect?</h3>
                <button @click='reconnect'>Reconnect!</button>
                </div>
            </popup>
        </transition>
        <transition name='fade'>
        <popup v-if='loading'>
            <div class="lds-default">
                <div></div><div></div><div></div>
                <div></div><div></div><div></div>
                <div></div><div></div><div></div>
                <div></div><div></div><div></div>
            </div>
        </popup>
        </transition>
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
import popup from '../components/Popups/Popup'
export default {
    components: {
        general,
        inventory,
        spells,
        background,
        popup
    },
    props: ['char','page'],
    data: function() {
        return {
            character: new Character(),
            connected: true,
            loading:true
        }
            
    },
    computed: {
        tempchar: function() {
            return Object.assign({},this.character)
        },
        wsservice: function() {
            return wsservice
        }
    },
    methods: {
        async getCharacter(id) {
            var temp = await characterService.getCharacter(id)
            this.loading = false
            if(!temp) {
                this.connected = false
            }
            else if(temp == '403') {
                this.$router.push('/403')
            } else {
                this.character = temp;
            }
        },
        async update(data) {
            if(!wsservice.send('update',data)) {
                await wsservice.link(this)
                await this.start()
                if(!wsservice.send('update',data)) {
                    console.log("COULD NO LONGER TRANSMIT DATA")
                }
            }
        },
        async remove(data) {
            if(!wsservice.send('remove',data)) {
                this.connected = false
            }
        },
        updateCharacter(data) { 
            data.forEach(element => {
                if(element.task ==='update') { 
                    this.deepMerge(this.character,element.data)
                } else if(element.task ==='remove') {
                    this.deepRemove(this.character,element.data)
                } else if(element.task === 'insert') {
                    //NOT USABLE FOR ARRAYS WITHIN ARRAYS YES
                    //E.G. modifiers inside a skill since skills are in an array
                    this.deepInsert(this.character,element.data)
                }
            })
            this.character = Character.from(this.character)
        },
        deepMerge(object,attributes) {
            var keys = Object.keys(attributes)
            for(let i = 0; i < keys.length;i++) {
                if(typeof object[keys[i]] === 'undefined') {
                    object[keys[i]] = {}
                }
                if(Array.isArray(object)) {  
                    this.deepMerge(object[keys[i]],attributes[keys[i]])
                    object.splice(keys[i],1,object[keys[i]])
                }
                else if(typeof attributes[keys[i]] === 'object') {
                    this.deepMerge(object[keys[i]],attributes[keys[i]])
                } else {
                    object[keys[i]] = attributes[keys[i]]
                }
            }
        },
        removeCharacter(data) {
            this.deepRemove(this.character,data)
            this.character = Character.from(this.tempchar)
        },
        deepRemove(object,attributes) {
            var keys = Object.keys(attributes)
            for(let i = 0; i < keys.length;i++) {
                if(Array.isArray(attributes)) {
                    if(Array.isArray(object)) {
                        object.splice(attributes[keys[i]],1)
                    } else {
                        console.log('cannot remove from non-array currently')
                        throw Error("cannot remove attribute")
                    }
                } else {
                    this.deepRemove(object[keys[i]],attributes[keys[i]])
                }
            }
        },
        deepInsert(object,attributes) {
            var keys = Object.keys(attributes)
            for(let i = 0; i < keys.length;i++) {
                if(Array.isArray(object)) { 
                    if(!isNaN(parseInt(keys[i]))) {
                        object.splice(keys[i],0,attributes[keys[i]])
                    } else {
                        this.deepInsert(object[keys[i]],attributes[keys[i]])
                    }
                }
                else {
                    this.deepInsert(object[keys[i]],attributes[keys[i]])
                }
            }
        },
        start() {
            this.connected = true
            wsservice.send('character',this.char)
        },
        load(pg) {
            this.$router.push('/charsheet/' +this.char +'/' + pg)
        },
        async reconnect() {
            this.loading = true
            await this.getCharacter(this.char)
            await wsservice.link(this)
        }

    },async beforeMount() {
        await this.getCharacter(this.char)
        await wsservice.link(this)
    },beforeDestroy() {
        wsservice.disconnect()
    }
}
</script>
<style lang='scss'>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.lds-default {
  display: inline-block;
  position: relative;
  top:50%;
  width: 80px;
  height: 80px;
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
@import '../scss/variables';
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
.charcontainer{
    background-color:$offwhite;
}
.charcontainer > *{
    h6{
        margin:0;
        font-size:0.8vw;

    }
    h4{
        margin:0
    }
    h5 {
        font-size:0.8vw;
        margin:0;
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
    button{
        font-size:1vw;
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
    background-color:$selecting;
}
p{
    margin-bottom:0;
}
@media only screen and (max-width:$medium-screen){
    .charcontainer > *{
        h6{
            margin:0;
            font-size:1.4vw;
        }
        h5 {
            font-size:1.6vw;
            margin:0;
        }
        h2{
            font-size:2.7vw;
            margin:0em;
        }
        h3{
            font-size:2.0vw;
            margin:0;
        }
        h1{
            margin:0;
        }
        button{
            font-size:2vw;
        }
    }
}
@media only screen and (max-width:$small-screen){
    .charcontainer > *{
        h6{
            margin:0;
            font-size:2.4vw;
        }
        h5 {
            font-size:2.8vw;
            margin:0;
        }
        h2{
            font-size:4vw;
            margin:0em;
        }
        h3{
            font-size:3.5vw;
            margin:0;
        }
        h1{
            margin:0;
        }
        button{
            font-size:3.2vw;
        }
    }
}
</style>
<style lang='scss' scoped>
@import '../scss/variables';
.tabcontainer{
    background-color:white;
    font-size:1vw;
    height:3em;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    width:100%;
    border-bottom: 1px solid black;
    padding:0;
    margin:0;

}
.tab{
    border-radius: 2em 2em 0% 0%;
    border-style: solid solid none solid;
    border-color:$border-color;
    border-width: 1px;
    font-size:1vw;
    height:3em;
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
    background-color: $selecting;
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
    height:calc(100vh - 3em - 6em);

}
.selected{
    border-bottom-style: none;
    -webkit-box-shadow: 6px 3px 14px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 6px 3px 14px -2px rgba(0,0,0,0.75);
    box-shadow: 6px 0px 14px -2px rgba(0,0,0,0.75);
    clip-path: inset(-5px -20px 0px -5px);
    background-color: $offwhite;
}

@media only screen and (max-width:$medium-screen) {
    .content{
        font-size:1.5vw;
        height:130em;
        grid-template-columns: repeat(4,1fr); 
        grid-template-rows: repeat(16,1fr);
    }
    .tabcontainer,.tab{
        font-size:1.5vw;
    }

}

@media only screen and (max-width:$small-screen) {
    .content{
        font-size:3vw;
        height:220em;
        grid-template-columns: repeat(2,1fr); 
        grid-template-rows: repeat(32,1fr);
    }
    .tabcontainer,.tab{
        font-size:3vw;
    }

}
</style>