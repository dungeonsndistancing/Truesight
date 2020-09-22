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

<style lang='scss' scoped>
@import '../../../scss/variables';
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
@media only screen and (max-width:$small-screen) {
    .weight{
    grid-column-start: 1;
    grid-column-end:3;
    grid-row-start:13;
    grid-row-end:14;        
    }
}
</style>