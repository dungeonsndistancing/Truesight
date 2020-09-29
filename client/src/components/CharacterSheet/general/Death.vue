<template>
  <div class='death'>
      <div class='death-inner dice'>
          <h5>Hit Dice</h5>
          Total:{{character.cclass.level}}d{{hitdice.dice}}
          <h5>Available</h5>
          {{hitdice.current}}d{{hitdice.dice}}
          <button @click='plusdice()'>+</button><button @click='mindice()'>-</button>
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
        hitdice: function() {
            if(typeof this.character !== 'undefined') {
                return Object.assign({},this.character.cclass.hitdice)
            }
            return {}            
        }
    },
    methods: {
        updateSaves() {
            var temp = {saves:this.saves}
            this.$emit('update',[{task:'update',data:temp}])
        },
        updateHitDice() {
            var temp = {cclass:{hitdice:this.hitdice}}
            this.$emit('update',[{task:'update',data:temp}])
        },
        plusdice() {
            if(this.hitdice.current < this.character.cclass.level) {
                this.hitdice.current++
            }
            this.update("cclass",this.cclass)
        },
        mindice() {
            if(this.hitdice.current > 0) {
                this.hitdice.current--
            }
            this.updateHitDice()
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
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
    column-gap: 10px;
}
.death-inner{
    font-size:0.9vw;
    border:1px solid black;
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