<template>
  <div class='death'>
      <div class='death-inner'>
          <h5>Hit Dice</h5>
          Total:{{character.cclass.level}}d{{character.cclass.hitdice.dice}}
          <h5>Available</h5>
          {{character.cclass.hitdice.current}}d{{character.cclass.hitdice.dice}}
          <button @click='plusdice()'>+</button><button @click='mindice()'>-</button>
      </div>
      <div class='death-inner'>
          <h5>Saving Throws</h5>
          <div>
            <div>successes:{{character.saves.succes}}</div>
            <div>failures:{{character.saves.failure}}</div>
          </div>
          <button @click='character.saves.succes++;update()'>Succes</button>
          <button @click='character.saves.failure++;update()'>Failure</button>
          <button @click='character.saves.failure = character.saves.succes = 0;update()'>Reset</button>
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
    methods: {
        update() {
            this.$emit('update',{keys:['saves','cclass'],values:[this.character.saves,this.character.cclass]})
        },
        plusdice() {
            if(this.character.cclass.hitdice.current < this.character.cclass.level) {
                this.character.cclass.hitdice.current++
            }
            this.update()
        },
        mindice() {
            if(this.character.cclass.hitdice.current > 0) {
                this.character.cclass.hitdice.current--
            }
            this.update()
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
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
    grid-row-start: 4;
    grid-row-end:5;
    display:grid;
    grid-template-columns: 1fr 1fr;
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
        grid-row-start: 6;
        grid-row-end:7; 
        font-size:3.5vw;       
    }
    .death-inner{
        font-size:3vw;
    }
}
</style>