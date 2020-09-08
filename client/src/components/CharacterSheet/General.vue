<template>
    <div class='general'>
        <div>
            <h5>Class & Level</h5>
            {{character.cclass.name}} {{character.cclass.level}}
        </div>
        <div>
            <h5>Background</h5>
            {{character.background}}
        </div>
        <div>
            <h5>Race</h5>
            {{character.race}}
        </div>
        <div>
            <h5>Alignment</h5>
            {{character.alignment}}
        </div>
        <div>
            <h5>Experience Points</h5>
            {{character.experience}}
        </div>
    </div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style>
.general{
    display:grid;
    grid-template-columns:repeat(3,33.3%);
    grid-template-rows: 50% 50%;
    grid-column-start:2;
    grid-column-end:4;
    grid-row-start:1;
    grid-row-end:3;
    margin:10px;
    border: 1px solid black;
}
</style>