<template>
  <div class='backstory clickable' @click='edit()'>
      <h3>Backstory</h3>
        <p class='info-text' v-if='!show'>{{backgroundinfo.backstory}}</p>
        <div class='edit-div' v-if='show'>
            <textarea class='edit' v-model='backgroundinfo.backstory'>
            </textarea>
            <button @click.stop='save()'> Save</button>
        </div>
  </div>
</template>

<script>
export default {
    props:['backgroundinfo'],
    data: function() {
        return {
            show:false
        }
    },
    methods: {
        update() {
            var temp = {backgroundinfo:{backstory:this.backgroundinfo.backstory}}
            this.$emit('update',[{task:'update',data:temp}])
        },
        edit() {
            this.show = true
        },
        save() {
            this.show = false
            this.update()
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.info-text {
    text-align: left;
    padding:10px;
}
.edit-div{
    height:100%;
}
.edit{
    font-size: 0.8vw;
    overflow-y: scroll;
    width:90%;
    height:90%;
    resize: none;
}
.backstory{
    border-radius:$border-radius;
    background-color:white;
    border:1px solid $border-color;
    grid-row-start: 2;
    grid-row-end:9;
    grid-column-start: 5;
    grid-column-end:7;
}
@media only screen and (max-width:$medium-screen) {
    .backstory{
        grid-row-start: 9;
        grid-row-end:16;
        grid-column-start: 1;
        grid-column-end:3; 
    }
}
@media only screen and (max-width:$small-screen) {
    .backstory{
        grid-row-start: 17;
        grid-row-end:25;
        grid-column-start: 1;
        grid-column-end:3; 
    }
}
</style>