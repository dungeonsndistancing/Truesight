<template>
  <div class='money'>
      <div v-for='(value,id) in money' :key='id'><h2>{{id}}:{{value}}</h2><div><button @click='up(id)'>⏶</button><button @click='down(id)'>⏷</button></div></div>
      <div class='money-button'><button>Mass Add</button><button>Mass Remove</button><button>Shift up</button></div>
  </div>
</template>

<script>
export default {
    props:['money'],
    methods: {
        up(id) {
            console.log(this.money[id])
            this.money[id] = parseInt(this.money[id]) + 1

        },
        down(id) {
            console.log(id)
            this.money[id] = parseInt(this.money[id]) - 1
        }
    }
}
</script>

<style>
.money{
    display:grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: 1fr 0.5fr;
    row-gap:5px;
    column-gap:20px;
    grid-column-start: 3;
    grid-column-end:5;
    grid-row-start:2;
    grid-row-end:4;
    border:1px solid black;
}
.money-button{
    display:grid;
    padding:5px;
    grid-template-columns:repeat(3,1fr);
    column-gap:10px;
    row-gap:10px;
    grid-column-start:1;
    grid-column-end:5;
}

</style>