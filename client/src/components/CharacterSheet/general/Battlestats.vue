<template>
  <div class='battle'>
      <div class='stat clickable' @click='show("ac","Armor Class")'><h5 >Armor Class</h5><h2 >{{character.ac}}</h2></div>
      <div class='stat clickable' @click='show("initiative","Initiative")'><h5>Initiative</h5><h2 ><b v-if='character.initiative > 0'>+</b>{{character.initiative}}</h2></div>
      <div class='stat clickable' @click='show("movement","Speed")'><h5>Speed</h5><h2 >{{character.movement}} ft</h2></div>
      <div class='stat clickable' @click='show("proficiency","Proficiency Bonus")'><h5>Proficiency Bonus</h5><h2 >+{{character.proficiency}}</h2></div>
      <div class='stat clickable' @click='show("maxhp","Maximum Health")'><h5>Max Health</h5><h2 >{{character.maxhp}}</h2></div>
      <div class='stat clickable' @click='show("currenthp","Current Health")'><h5>Current Health</h5><h2 >{{character.currenthp}}</h2></div>
      <div class='stat clickable' @click='show("temporaryhp","Temporary Health")'><h5>Temporary Health</h5><h2 >{{character.temporaryhp}}</h2></div>
      <div class='stat'><h5>Passive Perception</h5><h2>{{character.passivePerception}}</h2></div>
      <popup v-show='pop' @close='close'>
          <div class='popup short' >
                <h2>{{poptitle}}</h2>
              <input class='input' v-model='item'>
              <button @click='close()'>Save</button>
          </div>
      </popup>
  </div>
</template>

<script>
import popup from '../../Popups/Popup'
export default {
    props:['character'],
    data: function() {
        return {
            pop:false,
            poptitle:'',
            item:'',
            identifier:''
        }
    },
    components: {
        popup
    },
    methods: {
        show(item,title) {
            this.pop = true
            this.identifier = item
            console.log(this.character[item])
            this.item = this.character[item]
            console.log(this.item)
            this.poptitle = title
        },
        close() {
            this.update()
            this.pop = false
        },
        update() {
            var temp = {}
            temp[this.identifier] = this.item
            this.$emit('update',[{task:'update',data:temp}])
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.battle{
    display:grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: 1fr 1fr;
    row-gap:10px;
    column-gap:10px;
    grid-column-start:1;
    grid-column-end:3;
    grid-row-start:2;
    grid-row-end:4;

}
.stat{
    position:relative;
    border: 1px solid black;
}
h5{
    font-size:0.8vw;
    margin-top:0.2em;
}
h2{
    font-size:1.2vw;
    margin:0.2em;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.hpinput{
    color: rgb(44,62,80);
    text-align: center;
    margin:0.2em;
    border:none;
    width:2em;
    font-size:1.5em;
    font-weight:bolder;
}

@media only screen and (max-width:$small-screen) {
    .battle{
        grid-column-start:1;
        grid-column-end:3;
        grid-row-start:4;
        grid-row-end:6;        
    }
}
</style>