<template>
  <div class='allies clickable' @click='edit()'>
      <h3>Allies & Organizations</h3>
        <p class='info-text' v-if='!show'>{{backgroundinfo.allies}}</p>
        <div class='edit-div' v-if='show'>
            <textarea class='edit' v-model='backgroundinfo.allies'>
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
    methods:{
        update() {
            var temp = {backgroundinfo:{allies:this.backgroundinfo.allies}}
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
.allies{
    border-radius:$border-radius;
    background-color:white;
    border:1px solid $border-color;
    grid-row-start: 2;
    grid-row-end:9;
    grid-column-start: 7;
    grid-column-end: 9;
}
@media only screen and (max-width:$medium-screen) {
    .allies{
        grid-row-start: 9;
        grid-row-end:16;
        grid-column-start: 3;
        grid-column-end:5; 
    }
}
@media only screen and (max-width:$small-screen) {
    .allies{
        grid-row-start: 25;
        grid-row-end:33;
        grid-column-start: 1;
        grid-column-end:3; 
    }
}
</style>