<template>
  <div class='attacks'>
      <h2>Attacks</h2>
      <div class='attack-row'>
          <div><b>Name</b></div>
          <div><b>Attack</b></div>
          <div><b>Damage</b></div>
      </div>
      <div class='attack-row' v-for='attack in attacks' :key='attack.name'>
          <div class='attack content'>{{attack.name}}</div>
          <div class='attack content'>{{attack.attack}}</div>
          <div class='attack content'>{{attack.damage}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props:['attacks']
}
</script>

<style>
.attacks{
    grid-column-start:5;
    grid-column-end:7;
    grid-row-start:1;
    grid-row-end:3;
    border:1px solid black;
    position:relative;
}
.attack-row{
    display:grid;
    grid-template-columns: 3fr 1fr 3fr;
}
.attack-row:nth-child(even) {
    background-color:rgb(207, 207, 207);
}
</style>