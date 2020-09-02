<template>
  <div id="item-creator">
      <form v-on:submit.prevent> 
          Item kind:<select name='items' id='items' @change='updateType()' v-model='typestring'>
              <option value='item'>Normal Item</option>
              <option value='magic item'>Magic Item</option>
              <option value='weapon'>Weapon</option>
              <option value='magic weapon'>Magic Weapon</option>
              <option value='armor'>Armor</option>
              <option value='magic armor'>Magic Armor</option>
            </select><br>
            <p>Name: <input v-model='item.name' type="text">
            type: <input v-model='item.type' type="text">
            cost: <input v-model='item.cost' type="text">
            weight: <input v-model='item.weight' type="text"></p>
            <p v-if='armor'>Armor Class: <input v-model='item.ac' type="text">
            Strength: <input v-model='item.strength' type="number">
            Stealth: <input v-model='item.stealth' type="text"></p>
            <p v-if='weapon'>Damage: <input v-model='item.damage' type="text">
            Properties: <input v-model='item.properties' type="text"></p>
            <p v-if='magic'>Rarity: <input v-model='item.ac' type="text">
            Attunement: <input v-model='item.attunement' type="text"></p>
          description: <textarea v-model='item.description'>hi</textarea>
          <div class='icon-container'>
            <div>icon:
                <div class="iconselection">
            
                    <div class="iconshow" v-bind:style="{backgroundColor:item.color}" @click="show = !show">
                        <img class='iconimg' :src="require(`../assets/icons/${item.icon}`)">
                        <img class='icondrop' src='../assets/dropdown.png'>
                    </div>
                    <div class="icondropdown" v-if="show">
                        <div class="iconcard"></div>
                        <div class="iconcard" v-for='x in iconarray' :key='x.name'><img v-bind:src="require(`../assets/icons/${x.path}`)" @click="select(x.path)"></div>
                    </div>
                </div>
            </div>
            <div class='colordiv'>
            color:<br> <input class='iconcolor' v-model="item.color" type="color">
            </div>
            <button @click='save()'>Save</button>
          </div>
      </form>
  </div>
</template>

<script>
import itemService from '../services/ItemService'
import icons from '../assets/icons.json'
import Item from '../../../shared/classes/items/item'
import Weapon from '../../../shared/classes/items/weapon'
import Armor from '../../../shared/classes/items/armor'
import MagicItem from '../../../shared/classes/items/magicitem'
import MagicWeapon from '../../../shared/classes/items/magicweapon'
import MagicArmor from '../../../shared/classes/items/magicarmor'
export default {
    data: function() {
        return {

            iconarray: [],
            show: false,
            item: new Item('test','test2',5,0.5,'this is a test','potion.png','#444444'),
            typestring: String,
            magic: false,
            weapon: false,
            armor: false
        }
    },methods: {
        select(path) {
            this.item.icon = path
            this.show = false
        },
        save() {
            console.log(this.item)
            itemService.saveItem(this.item)
            this.$router.push('/items')
        },
        updateType() {
            if(this.typestring.includes('magic')) {
                this.magic = true
                if(this.typestring.includes('weapon')) {
                    this.weapon = true
                    this.armor = false
                    this.item = new MagicWeapon(this.item.name,this.item.type,this.item.cost,this.item.weight,this.item.description,'','','','',this.item.icon,this.item.color)
                } else {
                    this.weapon = false
                    if(this.typestring.includes('armor')) {
                        this.item = new MagicArmor(this.item.name,this.item.type,this.item.cost,this.item.weight,this.item.description,'','','','','',this.item.icon,this.item.color)
                        this.armor = true
                    } else {
                        this.armor = false
                        this.item = new MagicItem(this.item.name,this.item.type,this.item.cost,this.item.weight,this.item.description,'','',this.item.icon,this.item.color)
                    }
                } 
            } else {
                this.magic = false
                if(this.typestring.includes('weapon')) {
                    this.weapon = true
                    this.armor = false
                    this.item = new Weapon(this.item.name,this.item.type,this.item.cost,this.item.weight,this.item.description,'','',this.item.icon,this.item.color)
                } else {
                    this.weapon = false
                    if(this.typestring.includes('armor')) {
                        this.item = new Armor(this.item.name,this.item.type,this.item.cost,this.item.weight,this.item.description,'','','',this.item.icon,this.item.color)
                        this.armor = true
                    } else {
                        this.armor = false
                        this.item = new Item(this.item.name,this.item.type,this.item.cost,this.item.weight,this.item.description,this.item.icon,this.item.color)
                    }
                } 
            }

        }

    },
    beforeMount() {
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
input[type=text],select,input[type=number] {
    border-radius:1em;
    border-style:solid;
    border-width: 1px;
    border-color:rgb(170, 170, 170);
    padding:0.5em;
    margin:0em 5em;
    width: calc(100% - 11em);
    display: inline-block;
}
select{
    margin:0;
    width: 10em;
}
input[type=text]:focus, input[type=number]:focus{
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
item-creator{
    align-items: center;
}
</style>