<template>
    <div class='attributes'>
        <div class='at-title'><h3>Attributes</h3></div>
        <div class='attr clickable' @click='update(attrid)' v-for='(attribute,attrid) in attributes' :key='attrid'>
            <h5>{{attrid}}</h5>
            <h2>{{attribute.value}}</h2>
            <div class='mod'><b v-if='attribute.mod > 0'>+</b><b>{{attribute.mod}}</b></div>
        </div>
        <popup v-show='atpop' @close='close'>
            <div class='popup long'>
                <h2>{{updateid}}</h2>
                <h3>{{attributes[updateid].value}}</h3>
                <h5>Base:</h5>
                <input class='input small' type='text' v-model='attributes[updateid].base'>
                <h5>Modifiers:</h5>
                <div class='scrollcontainer'>
                    <div class='mod-div' v-for='mod in attributes[updateid].modifiers' :key='mod._id'>
                        Name:<input class='input' type='text' v-model='mod.name'>
                        Value:<input class='input' type='number' v-model='mod.value'>
                        Source:<input class='input' type='text' v-model='mod.source'><br>
                        <button @click='attributes[updateid].removemodifier(mod.name,mod.source)'>Remove Modifier</button>
                    </div>
                </div>
                <br>
                <button @click='attributes[updateid].addmodifier("",0,"")' >Add modifier</button>
                <button @click='close()'>Close</button>
            </div>
        </popup>
    </div>
</template>

<script>
import popup from '../../Popups/Popup'
export default {
    props:['attributes'],
    components: {
        popup
    },
    data: function() {
        return {
            atpop:false,
            updateid:'strength',
        }
    },
    methods: {
        update(id) {
            console.log(this.attributes[id])
            this.updateid=id
            this.atpop=true
        },
        close() {
            console.log('huh')
            this.updateid='strength'
            this.atpop=false
            this.send()
        },
        send(){
            this.$emit('update',{keys:['attributes'],values:[this.attributes]})
        }
    }
}
</script>

<style scoped>
.scrollcontainer{
    border-style:solid none solid none;
    border-width:1px;
    height:50%;
    background-color:rgb(223, 223, 223);
    overflow-y: scroll;
}
.mod-div{
    padding:0.5em;
    margin:0.3em 15% 0.3em 15%;
    border:1px solid black;
}
.attributes{
    padding:5px;
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:5;
    grid-row-end:9;
    row-gap: 10px;
    column-gap: 10px;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows:0.1fr 1fr 1fr 1fr;
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
    width:70%;
    height:35%;
    font-size:1.5vw;
    line-height:1.5em;
    border-radius:50%;
    margin:0 auto 0 auto;
    
}

.at-title{
    grid-column-start:1;
    grid-column-end:3;
}

h5{
    margin-top:0.1em;

}


</style>