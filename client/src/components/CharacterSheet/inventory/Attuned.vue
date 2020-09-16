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

<style>
.attuned{
    border:1px solid black;
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 6;
    grid-row-end: 9;
}
</style>