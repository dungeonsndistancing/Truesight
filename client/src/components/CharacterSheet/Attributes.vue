<template>
    <div class='attributes'>
        <div class='at-title'><h3>Attributes</h3></div>
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
    padding:5px;
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:2;
    grid-row-end:5;
    row-gap: 10px;
    column-gap: 10px;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows:0.5fr 2fr 2fr 2fr;
    background-color: rgb(228, 228, 228);
}
.attr{
    overflow:hidden;
    background-color:white;
    margin:0;
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
.at-title{
    grid-column-start:1;
    grid-column-end:3;
}
h3{
    margin:0;
}
h5{
    margin-top:0.1em;

}
h2{
    margin:0.1em auto 0em auto;
}

</style>