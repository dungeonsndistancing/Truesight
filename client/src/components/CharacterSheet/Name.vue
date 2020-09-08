<template>
    <div class='name'><h5>Character Name</h5>{{name}}</div>
</template>

<script>
export default {
    props:['name']
}
</script>

<style>
.name{
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:1;
    grid-row-end:2;
    margin:10px;
    border: 1px solid black;
}
</style>