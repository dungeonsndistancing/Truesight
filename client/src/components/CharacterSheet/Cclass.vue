<template>
    <div class='class'>
        <div>
                    <h5>Class</h5>
                    
       <b> {{cclass.level}}</b><i v-if="cclass.level == parseInt(1)" >st</i>
        <i v-else-if="(cclass.level > 3 && cclass.level < 21)" >th</i>
        <i v-else-if="cclass.level == 2">nd</i>
        <i v-else>rd</i>
        level <i><b>{{cclass.name}}</b></i>
        <h6><i>{{cclass.subclass}}</i></h6>
        </div>
    </div>
</template>

<script>
export default {
    props:['cclass'],
    methods: {
        save() {
            this.$emit('update',{keys:['cclass'],values:[this.cclass]})
        }
    }
}
</script>

<style>
.class{

    grid-row-start: 1;
    grid-row-end:2;
    grid-column-start:2;
    grid-column-end:3;
    display:grid;
    grid-template-columns: 1fr;
    column-gap: 10px;;
    grid-template-rows: 1fr;

}
.class div{
    border:1px solid black;
}
h6{
    margin:0.1em;
}
</style>