<template>
  <div class='experience clickable' @click='edit()'>
      <div>
        <h2>Experience</h2>
        <h3 v-if='!show'>{{experience}}</h3>
        <div v-if='show'>
            <input @click.stop class='input wide' v-model='editexp' type="number"><br>
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
            editexp:0
        }
    },
    methods: {
        edit() {
            this.show = !this.show
            this.editexp = this.experience
        },
        save() {
            this.show = false
            this.$emit('update',{keys:['experience'],values:[this.editexp]})
        }
    }

    
}
</script>

<style>
.experience{
    border:1px solid black;
    grid-row-start: 1;
    grid-row-end:2;
    grid-column-start: 3;
    grid-column-end:5;

}
</style>