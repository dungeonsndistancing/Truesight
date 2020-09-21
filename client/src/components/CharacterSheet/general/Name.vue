<template>
    <div class='name clickable' @click='show=!show;editname=name'>
        <h5>Character Name</h5>
        <p v-if='!show'>{{name}}</p>
        <div v-if='show'>
            <input @click.stop class='input medium' v-model='editname' type="text"><br>
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
            this.$emit('update',{keys:['name'],values:[this.editname]})
        }
    }
}
</script>

<style scoped>
.name{
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:1;
    grid-row-end:2;
    border: 1px solid black;
}
</style>