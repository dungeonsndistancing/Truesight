<template>
  <div class='name clickable' @click='show=true'>
      <b v-if='!show'>{{name}}</b>
      <div v-if='show'><input v-model='editname' class='input' ><button @click.stop='show=false;update()'>Save</button></div>
    </div>
</template>

<script>
export default {
    props:{
        name:String
    },
    data: function() {
        return {
            show:false,
            editname:name
        }
    },
    methods: {
        update() {
            this.$emit('update',{keys:['name'],values:[this.editname]})
        }
    }
}
</script>

<style lang='scss' scoped>
.input {
    text-align:center;
    width:90%;
    font-size:2vw;
}
.name {
    font-weight: bolder;
    border:1px solid black;
    grid-row-end: 2;
    grid-row-start: 1;
    grid-column-start: 1;
    grid-column-end:3;
    font-size:3vw;
}
</style>