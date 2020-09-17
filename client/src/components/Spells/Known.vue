<template>
  <div class='known'>
      <h2>Known spells</h2>
  </div>
</template>

<script>
export default {
    props:{
        spellbook:Object
    }
}
</script>

<style>
.known{
    border:1px solid black;
    grid-column-start: 1;
    grid-column-end:3;
    grid-row-start:1;
    grid-row-end:9
}
</style>