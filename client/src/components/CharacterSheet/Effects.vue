<template>
  <div class='effects'>
      <h2>Effects & Conditions</h2>
      <div class='hor-scroll'>
          <div v-for='(effect,id) in effects' :key='id'></div>
      </div>
  </div>
</template>

<script>
export default {
 props:['effects']
}
</script>

<style>
.effects{
    grid-column-start: 5;
    grid-column-end:7;
    grid-row-start: 7;
    grid-row-end:9;
    background-color: rgb(228, 228, 228);
}
.hor-scroll{
    height:80%;
    display:grid;
    grid-template-columns: repeat(6,1fr);
}
</style>