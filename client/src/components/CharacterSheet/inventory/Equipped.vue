<template>
    <div class='equipped'>
        <div class='inner'>
            <h2>Equipped</h2>
            <div class='item-container'>
                <div class='item-row'><h4>Name</h4><h4>Amount</h4><h4>Weight</h4></div>
                <div class='item-row' draggable="true" @click='show(id)' v-for='(item,id) in inventory.equipped' :key='id'>
                    <div style='text-align:left'>{{item.name}}</div>
                    <div class='itemcount' @click.stop='showcount(id);'>{{item.count}}
                        <div v-if='countid==id' @click.stop='showcount(id);update()' class='countedit'>
                            <input type='number' @click.stop="" v-model='item.count' class='input small '>
                            <button @click.stop='showcount(id);update();'>save</button>
                        </div>
                    </div>
 
                    <div style='text-align:right'>{{item.weight}} lbs</div>
                    <div v-if='showid==id' class='iteminfo'>
                        <div class='extraitem' v-for='(info,id) in item.display()' :key='id'>{{id}}:{{info}}</div>
                        <p class='item-description'>{{item.description}}</p>
                        <div>
                            <button @click.stop='unequipItem(item)'>Unequip</button>
                            <button v-if='typeof item.attunement !=="undefined" && !item.attuned' @click.stop='attuneItem(item)'>Attune</button>
                            <button v-if='typeof item.attunement !=="undefined" && item.attuned' @click.stop='unattuneItem(item)'>Un-Attune</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import icons from '../assets/icons.json'
import Item from '../../../../../shared/classes/items/item'

export default {
    props:{
        inventory: Object,
    }, 
    data: function() {
        return{
            showid:-1,
            countid:-1,
        }
    },
    components: {
    },
    methods: {
        close() {
            this.pop = false
        },
        show(id) {
            if(this.showid == id) {
                this.showid = -1
            } else {
                this.showid = id
            }
        },
        showcount(id){
            if(this.countid == id) {
                this.countid = -1
            } else {
                this.countid = id
            }
        },
        saveItem(){
            this.item.count = 1
            this.inventory.add(this.item)
            this.item= new Item('name','type','cost',0,'description','icon','color')
            this.update()
            this.pop = false

        },
        unequipItem(item) {
            console.log('equipping item')
            this.inventory.unequip(item)
            this.update()
        },
        attuneItem(item) {
            item.attuned = true
            this.update()
        },
        unattuneItem(item) {
            item.attuned = false
            this.update()
        },
        update() {
            this.$emit('update',{keys:['inventory'],values:[this.inventory]})
        },
        cancel() {
            this.pop=false
        },
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.buttonclass{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    margin:0 auto;
    width:100%;
}
.itemcount{
    position:relative;
}
.itemcreator{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    width:90%;
    border:1px solid black;
    background-color:white;
}
.countedit{
    padding:50px;
    width:9em;
    padding:0;
    margin:0;
    border-radius:1vw;
    background-color:rgb(231, 231, 231);
    float:left;
    position:absolute;
    height:2em;
    bottom:1px;
    left:-10px;
    z-index:3;
}
.equipped{
    vertical-align: bottom;
    border:1px solid black;
    grid-column-start: 3;
    grid-column-end:5;
    grid-row-start:1;
    grid-row-end:5;
}
#items{
    font-size:1vw;
}
.item-row{
    position:relative;
    text-align: center;
    display:grid;
    grid-template-columns: 6fr 2fr 2fr;
    line-height:1.5em;
    padding:0 1vw;

}
.iteminfo{
    background-color:inherit;
    width:100%;
    top:3vh;
    z-index:2;
    grid-column-start: 1;
    grid-column-end:4;
}
.item-row:nth-child(even) {
    background-color:rgb(233, 233, 233);
}
.item-row:nth-child(odd) {
    background-color:white;
}
h4{
    margin:0 0 0 0;
}
h2{
    margin:0;
}
.inner{
    height:100%;
    position: relative;
}
.item-container{
    overflow-y:scroll;
    max-height:85%;
}
textarea{
    width:90%;
    height:15vh;
    resize: none;
}
.item-description {
    text-align:left;
    line-height:2vh;
    white-space:pre-wrap;
    border-bottom: 1px solid black;
}
@media only screen and (max-width:$small-screen) {
    .equipped{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:9;
        grid-row-end:13;
    }
}
</style>