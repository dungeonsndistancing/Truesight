<template>
    <div class='attuned'><h2>Attuned items</h2>
        <div v-for='(item,id) in inventory.attuned' :key='id'>
            {{item.name}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        inventory:Object
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.attuned{
    border:1px solid $border-color;
    border-radius:$border-radius;
    background-color:white;
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 6;
    grid-row-end: 9;
}
@media only screen and (max-width:$small-screen) {
    .attuned{
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 14;
        grid-row-end: 17;       
    }
}
</style>