<template>
  <div class='death'>
      <div class='death-inner'>
          <h5>Hit Dice</h5>
          Total:{{character.cclass.level}}d{{character.cclass.hitdice.dice}}
          <h5>Available</h5>
          {{character.cclass.hitdice.current}}d{{character.cclass.hitdice.dice}}
          <button @click='character.cclass.hitdice.current++;update()'>+</button><button @click='character.cclass.hitdice.current--;update()'>-</button>
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
    methods: {
        update() {
            //send update
        },
    }
}
</script>

<style>
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
</style>