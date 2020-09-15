<template>
    <div class='name'><h5>Character Name</h5>{{name}}</div>
</template>

<script>
export default {
    props:['name']
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