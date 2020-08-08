<template>
  <div class="hello">
    <div class="content">
      <button @click="load('/characters')">Characters</button>
      <button @click="load('/spells')">Spells</button>
      <button @click="load('/rules')">Rules</button>
      <button>Misc</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  methods: {
    load: function(direction) {
      this.$router.push(direction);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  clear:both;
  height:80vh;
  display: grid;
  grid-template-columns:  auto auto;
}
.content button {
  color: #214478;
  background-color: white;
  font-size: 20pt;
  display: inline-block;
  border-style: solid;
  border-color: #214478;
}
</style>
