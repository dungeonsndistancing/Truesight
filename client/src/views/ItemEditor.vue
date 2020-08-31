<template>
  <div id="item-editor">
      <form v-on:submit.prevent> 
          Name: <input v-model='edititem.name' type="text">
          type: <input v-model='edititem.type' type="text">
          cost: <input v-model='edititem.cost' type="text">
          weight: <input v-model='edititem.weight' type="text">
          attribute: <input v-model='edititem.attribute' type="text">
          notes: <input v-model='edititem.notes' type="text">
          description: <textarea v-model='edititem.description'>hi</textarea>
          <div class='icon-container'>
            <div>icon:
                <div class="iconselection">
            
                    <div class="iconshow" v-bind:style="{backgroundColor:edititem.color}" @click="show = !show">
                        <img class='iconimg' :src="require(`../assets/icons/${edititem.icon}`)">
                        <img class='icondrop' src='../assets/dropdown.png'>
                    </div>
                    <div class="icondropdown" v-if="show">
                        <div class="iconcard"></div>
                        <div class="iconcard" v-for='x in iconarray' :key='x.name'><img v-bind:src="require(`../assets/icons/${x.path}`)" @click="select(x.path)"></div>
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
                type: '',
                cost: '',
                weight: '',
                attribute: '',
                notes: '',
                description: '',
                icon: 'potion.png',
                color: '#444444',
            }
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
            const temp = await itemService.getItem(this.item)
            console.log(temp)
            this.edititem = temp
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
input[type=text] {
    border-radius:1em;
    border-style:solid;
    border-width: 1px;
    border-color:rgb(170, 170, 170);
    padding:0.5em;
    margin:0em 5em;
    width: calc(100% - 11em);
    display: inline-block;
}
input[type=text]:focus{
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