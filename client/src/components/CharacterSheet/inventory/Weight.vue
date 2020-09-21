<template>
    <div class='weight'>
        <h2>Encumberance</h2>
        <h1>{{inventory.weight}} lbs</h1>
    </div>
</template>

<script>
export default {
    props:{
        inventory:Object
    }
}
</script>

<style scoped>
.weight{
    grid-column-start: 3;
    grid-column-end:5;
    grid-row-start:5;
    grid-row-end:6;
    border:1px solid black;
}
h1{
    margin:0;
}
</style>