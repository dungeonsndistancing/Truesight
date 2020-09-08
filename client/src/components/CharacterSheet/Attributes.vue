<template>
    <div class='attributes'>
        <div class='attr' v-for='(attribute,attrid) in attributes' :key='attribute.name'>
            <h5>{{attrid}}</h5>
            <h2>{{attribute.value}}</h2>
            <div class='mod'><b v-if='attribute.mod > 0'>+</b><b>{{attribute.mod}}</b></div>
        </div>
    </div>
</template>

<script>
export default {
    props:['attributes']
}
</script>

<style scoped>
.attributes{
    margin:10px;
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:2;
    grid-row-end:5;
    display:grid;
    grid-template-columns: 50% 50%;
    grid-template-rows:repeat(3,33.33%);
    background-color: rgb(197, 197, 197);
}
.attr{
    overflow:hidden;
    background-color:white;
    margin:0.3em 0.7em 0.3em 0.4em;
    padding:0;
    border: 1px solid black;
}
.mod{
    border: 1px solid black;
    width:3em;
    height:1.5em;
    line-height:1.5em;
    border-radius:50%;
    margin:0 auto 0 auto;
    
}
h5{
    margin-top:0.1em;

}
h2{
    margin:0em;
}

</style>