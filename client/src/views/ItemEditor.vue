<template>
  <div id="item-editor">
      <form v-on:submit.prevent> 
            Name: <input v-model='edititem.name' type="text">
            type: <input v-model='edititem.type' type="text">
            cost: <input v-model='edititem.cost' type="text">
            weight: <input v-model='edititem.weight' type="number">
            <p v-if='armor'>Armor Class: <input v-model='edititem.ac' type="text">
            Strength: <input v-model='edititem.strength' type="number">
            Stealth: <input v-model='edititem.stealth' type="text"></p>
            <p v-if='weapon'>Damage: <input v-model='edititem.damage' type="text">
            Properties: <input v-model='edititem.properties' type="text"></p>
            <p v-if='magic'>Rarity: <input v-model='edititem.ac' type="text">
            Attunement: <input v-model='edititem.attunement' type="text"></p>
          description: <textarea v-model='edititem.description'>hi</textarea>
          <div class='icon-container'>
            <div>icon:
                <div class="iconselection">
            
                    <div class="iconshow" v-bind:style="{backgroundColor:edititem.color}" @click="show = !show">
                        <img class='iconimg' :src="require(`../assets/icons/items/${edititem.icon}`)">
                        <img class='icondrop' src='../assets/dropdown.png'>
                    </div>
                    <div class="icondropdown" v-if="show">
                        <div class="iconcard"></div>
                        <div class="iconcard" v-for='x in iconarray' :key='x.name'><img v-bind:src="require(`../assets/icons/items/${x.path}`)" @click="select(x.path)"></div>
                    </div>
                </div>
            </div>
            <div class='colordiv'>
            color:<br> <input class='iconcolor' v-model="edititem.color" type="color">
            </div>
            <button @click='save()'>Save</button><button @click='remove()'>Delete</button>
          </div>
      </form>
  </div>
</template>

<script>
import itemService from '../services/ItemService'
import icons from '../assets/icons.json'
export default {
    props: ['item'],
    data: function() {
        return {
            
            iconarray: [],

            show: false,
            edititem: {
                name: '',
                class: '',
                type: '',
                cost: '',
                weight: '',
                attribute: '',
                notes: '',
                description: '',
                icon: 'potion.png',
                color: '#444444',
            },
            magic: false,
            weapon: false,
            armor: false,
        }
    },methods: {
        select(path) {
            this.edititem.icon = path
            this.show = false
        },
        save() {
            console.log(this.item)
            itemService.updateItem(this.edititem)
            this.$router.push('/items')
        },
        async getItem() {
            this.edititem = await itemService.getItem(this.item)
            console.log(this.edititem.class)
            if(typeof this.edititem.class === 'undefined') {
                this.edititem.class = 'item'
            }
            if(this.edititem.class.includes('magic')) {
                this.magic = true
            }
            if(this.edititem.class.includes('weapon')) {
                this.weapon = true
                this.armor = false
            } else {
                this.weapon = false
                if(this.edititem.class.includes('armor')) {
                    this.armor = true
                } else {
                    this.armor = false
                }
            }

            
        },
        remove() {
            console.log(this.item)
            itemService.removeItem(this.item)
            this.$router.push('/items')
        }
    },
    beforeMount() {
        this.getItem()
        this.iconarray = icons
        
    }
}
</script>

<style scoped>
.icondropdown{
    overflow-y: scroll;
    max-height: 10em;
}
.iconcard img{
    height:3.1em;
}
.icon-container{
    line-height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    display: inline-grid;

}
textarea{
    border-radius:1em;
    padding:1em;
    height:15em;
    width:calc(100% - 2em);
    resize: none;
    border-color:rgb(170, 170, 170);
}
textarea:focus{
    outline:none;
    border-color: black;
}
input[type=text],input[type=number] {
    border-radius:1em;
    border-style:solid;
    border-width: 1px;
    border-color:rgb(170, 170, 170);
    padding:0.5em;
    margin:0em 5em;
    width: calc(100% - 11em);
    display: inline-block;
}
input[type=text]:focus,input[type=number]:focus{
    outline: none;
    border-color:black;
}
form{
    padding:0.4em 0;
    margin:auto;
    width: 25em;
}
.iconcolor{
    padding:0;
    margin:0;
    width:100%;
    height:4em;
}
.iconshow{
    width:3.5em;
    height:3.5em;
}
.iconselection{
    position: relative;
    background-color:rgb(189, 189, 189);
    border-color:rgb(54, 54, 54);
    border-style: solid;
    border-radius:0.5em;
    border-width: 1px;
    overflow: hidden;
    width:5em;
    margin:auto;
}
.iconimg{
    position: absolute;
    left:0.3em;
    top:0.2em;
    height:3.1em;
}
.icondrop{
    position:absolute;
    right:0.2em;
    top:1.5em;
    width:1.1em;
}
item-editor{
    align-items: center;
}
</style>