<template>
  <div class='experience clickable' @click='edit()'>
      <div>
        <h2>Experience</h2>
        <h3 v-if='!show'>{{experience}}</h3>
        <div v-if='show'>
            <input @click.stop class='input wide' v-model='editexp' type="number">
            <button @click.stop='save()'>Save</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['experience'],
    data: function() {
        return {
            show:false,
            editexp:this.experience
        }
    },
    methods: {
        edit() {
            this.show = !this.show
            this.editexp = this.experience
        },
        save() {
            this.show = false
            var temp = {experience:this.editexp}
            this.$emit('update',[{task:'update',data:temp}])
        }
    }

    
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.experience{
    border:1px solid black;
    grid-row-start: 1;
    grid-row-end:2;
    grid-column-start: 2;
    grid-column-end:3;

}
@media only screen and (max-width:$small-screen) {
    .experience{
        grid-row-start: 1;
        grid-row-end:2;
        grid-column-start: 2;
        grid-column-end:3;
    }
}
</style>