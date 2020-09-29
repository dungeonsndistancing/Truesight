<template>
  <div class='death'>
      <div class='death-inner dice'>
          <h4>Hit Dice Total:</h4>
          <div v-for='(cls,id) in cclass' :key='id'>
              <h5>{{cls.name}}</h5>
              {{cls.level}}d{{cls.hitdice.dice}}</div>
          <h4>Available</h4>
          <div v-for='(cls,id) in cclass' :key='id+cclass.length'> 
              {{cls.hitdice.current}}d{{cls.hitdice.dice}}
            <button @click='plusdice(id)'>+</button><button @click='mindice(id)'>-</button>
          </div>
      </div>
      <div class='death-inner saves'>
          <h5>Saving Throws</h5>
          <div>
            <div>successes:{{saves.succes}}</div>
            <div>failures:{{saves.failure}}</div>
          </div>
          <button @click='saves.succes++;updateSaves()'>Succes</button>
          <button @click='saves.failure++;updateSaves()'>Failure</button>
          <button @click='saves.failure = saves.succes = 0;updateSaves()'>Reset</button>
      </div>
  </div>
</template>

<script>
export default {
    props:['character'],
    data:function() {
        return {

        }
    },
    computed: {
        saves: function() {
            if(typeof this.character !== 'undefined') {
                return Object.assign({},this.character.saves)
            }
            return {}
        },
        cclass: function() {
            if(typeof this.character !== 'undefined') {
                return Object.assign({},this.character.cclass)
            }
            return {}            
        }
    },
    methods: {
        updateSaves() {
            var temp = {saves:this.saves}
            this.$emit('update',[{task:'update',data:temp}])
        },
        updateHitDice(id) {
            var temp = {cclass:{}}
            temp.cclass[id] = {}
            temp.cclass[id].hitdice = this.cclass[id].hitdice
            this.$emit('update',[{task:'update',data:temp}])
        },
        plusdice(id) {
            if(this.cclass[id].hitdice.current < this.cclass[id].level) {
                this.cclass[id].hitdice.current++
            }
            this.updateHitDice(id)
        },
        mindice(id) {
            if(this.cclass[id].hitdice.current > 0) {
                this.cclass[id].hitdice.current--
            }
            this.updateHitDice(id)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
p{
    margin:0.1em;
}
.saves{
    grid-column-start:1;
    grid-column-end: 2;
    grid-row-start:2;
    grid-row-end: 3;
}
.dice {
    grid-column-start: 2;
    grid-column-end:3;
    grid-row-start:1;
    grid-row-end:3;
    overflow-y:scroll;
}
button{
    font-size:1vw;
    margin:0;
    padding:0;
}
.death-inner button{
    padding:0 0.2em 0 0.2em;
}
.death {
    font-size:1.1vw;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end:5;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
}
.death-inner{
    padding-top:0.2em;
    font-size:0.9vw;
    border:1px solid $border-color;
    border-radius:$border-radius;
    background-color:white;
}
@media only screen and (max-width:$medium-screen) {
    .death{
        font-size:2vw;
    }
    .death-inner {
        font-size:1.8vw;
    }
}

@media only screen and (max-width:$small-screen) {
    .death{
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 5;
        grid-row-end:7; 
        font-size:3.5vw;       
    }
    .death-inner{
        font-size:3vw;
    }
}
</style>