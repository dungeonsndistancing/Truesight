<template>
  <div class='attacks'>
        <div class='inner'>
        <h2>Attacks</h2>
        <div class='scroll'>
            <div class='attack-row'>
                <div><b>Name</b></div>
                <div><b>Attack</b></div>
                <div><b>Damage</b></div>
            </div>
            <div @click='edit(id)' class='attack-row clickable ' v-for='(attack,id) in attacks' :key='(attack.name + attack.attack + attack.damage)'>
                <div class='attack content'>{{attack.name}}</div>
                <div class='attack content'>{{attack.attack}}</div>
                <div class='attack content'>{{attack.damage}}</div>
            </div>
        </div>
        <button class='bottom-button' @click='newAttack()'>Add Attack</button>
      </div>
      <popup v-if='pop' @close="close()">
          <div class='popup popgrid'>
              <h5>name:</h5> <input class='input wide' v-model='attackarray[attackid].name' type='text'>
              <h5>attack:</h5> <input class='input small' v-model='attackarray[attackid].attack' type='text'>
              <h5>damage:</h5>: <input class='input wide' v-model='attackarray[attackid].damage' type='text'><br>
              <button @click='save()'>Close</button><button @click='removeAttack(attackid)'>Delete Attack</button>
          </div>
      </popup>

  </div>
</template>

<script>
import Attack from '../../../../../shared/classes/attack'
import popup from '../../Popups/Popup'
export default {
    props:{
        attacks:Array
    },
    components: {
        popup
    },
    data: function() {
        return {
            pop:false,
            attackid:0
        }
    },
    computed: {
        attackarray: function() {
            if(typeof this.attacks != 'undefined') {
                return Array.from(this.attacks)
            } 
            return new Array()
        }
    },
    methods: {
        save() {
            var tempattacks = {}
            tempattacks[this.attackid] = this.attackarray[this.attackid]
            this.$emit('update',{keys:['attacks'],values:[tempattacks]})
            this.close()
        },
        close() {
            this.pop=false
        },
        edit(id) {
            this.attackid = id
            this.pop=true
        },
        newAttack() {
            this.attackarray.push(new Attack("attack","+0","-"))
            this.save()
            this.edit(this.attackarray.length-1)
        },
        removeAttack(id){
            this.close()
            this.$emit('remove',{keys:['attacks'],values:[id]})
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.inner{
    height:100%;
    position: relative;
}
.bottom-button{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
}
.attack-but{
    position:relative;
}
.attack-but button{
    position:absolute;
    bottom:0;

}
.scroll{
    height:70%;
    overflow-y:scroll;
}
.attack{
    font-size:1vw;
}
.attacks{
    grid-column-start:5;
    grid-column-end:7;
    grid-row-start:1;
    grid-row-end:3;
    border:1px solid black;
}
.attack-row{
    min-height:15px;
    display:grid;
    font-size:0.9vw;
    grid-template-columns: 3fr 1fr 3fr;
}
.attack-row:nth-child(odd) {
    background-color:rgb(226, 226, 226);
}
@media only screen and (max-width:$medium-screen) {
    .attacks{
        grid-column-start:1;
        grid-column-end:3;
        grid-row-start:9;
        grid-row-end:11;
    }
    .attack{
        font-size:2vw;
    }
    .attack-row{
        font-size:1.8vw;
    }
}
@media only screen and (max-width:$small-screen) {
    .attacks{
        grid-column-start:1;
        grid-column-end:3;
        grid-row-start:17;
        grid-row-end:19;
    }
    .attack{
        font-size:3.2vw;
    }
    .attack-row{
        font-size:3vw;
    }
}
</style>