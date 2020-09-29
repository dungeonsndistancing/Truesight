<template>
    <div class='name clickable' @click='show=!show;editname=name'>
        <h5>Character Name</h5>
        <p v-if='!show'>{{name}}</p>
        <div v-if='show'>
            <input @click.stop class='input medium' v-model='editname' type="text">
            <button @click.stop='show = false;update()'>Save</button>
        </div>
    </div>
</template>

<script>
export default {
    props:['name'],
    data: function() {
        return {
            show:false,
            editname:name,
        }
    },
    methods:{
        update() {
            var temp = {name:this.editname}
            this.$emit('update',[{task:'update',data:temp}])
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.name{
    padding:0em;
    font-size:2vw;
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:1;
    grid-row-end:2;
    border: 1px solid black;
}
.name p {
    margin:0em;

}
@media only screen and (max-width:$medium-screen) {
    .name{
        font-size:3.2vw;  
    } 
}
@media only screen and (max-width:$small-screen) {
    .name{
        font-size:5vw;  
    } 
}
</style>