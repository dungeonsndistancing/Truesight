<template>
  <div class='name clickable' @click='show=true;editname=name'>
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
            editname:''
        }
    },
    methods: {
        update() {
            var temp = {name:this.editname}
            this.$emit('update',[{task:'update',data:temp}])
        }
    }
}
</script>

<style lang='scss' scoped>
@import'../../../scss/variables.scss';
.input {
    text-align:center;
    width:90%;
    font-size:2vw;
}
.name {
    font-weight: bolder;
    border-radius:$border-radius;
    background-color:white;
    border:1px solid $border-color;
    grid-row-end: 2;
    grid-row-start: 1;
    grid-column-start: 1;
    grid-column-end:3;
    font-size:3vw;
}
</style>