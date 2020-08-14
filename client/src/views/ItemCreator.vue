<template>
  <div id="item-creator">
      <form> 
          Name: <input type="text">
          type: <input type="text">
          cost: <input type="text">
          weight: <input type="text">
          attributes: <input type="text">
          notes: <input type="text">
          description: <textarea>hi</textarea>
          <div class='icon-container'>
            <div>icon:
                <div class="iconselection">
            
                    <div class="iconshow" v-bind:style="{backgroundColor:iconColor}" @click="show = !show">
                        <img class='iconimg' :src="require(`../assets/icons/${icon}`)">
                        <img class='icondrop' src='../assets/dropdown.png'>
                    </div>
                    <div class="icondropdown" v-if="show">
                        <div class="iconcard"></div>
                        <div class="iconcard" v-for='x in iconarray' :key='x.name'><img v-bind:src="require(`../assets/icons/${x.path}`)" @click="select(x.path)"></div>
                    </div>
                </div>
            </div>
            <div class='colordiv'>
            color:<br> <input class='iconcolor' v-model="iconColor" type="color">
            </div>
          </div>
      </form>
  </div>
</template>

<script>
import icons from '../assets/icons.json'
export default {
    data: function() {
        return {
            iconColor: '#444444',
            iconarray: [],
            icon: 'potion.png',
            show: false
        }
    },methods: {
        select(path) {
            this.icon = path
            this.show = false
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
item-creator{
    align-items: center;
}
</style>