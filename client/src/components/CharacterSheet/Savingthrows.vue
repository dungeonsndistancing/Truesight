<template>
  <div class='savingthrows'>
        <div class='save-title'><h3>Saving Throws</h3></div>
        <div class='save clickable' @click='open(saveid)' v-for='(savingthrow,saveid) in character.savingthrows' :key='saveid'>
            <h5>{{saveid}}</h5>
            <div  class='save-mod'><h2><b v-if='savingthrow.bonus(character.attributes[saveid].mod,character.proficiency) > 0'>+</b>{{savingthrow.bonus(character.attributes[saveid].mod,character.proficiency)}}</h2></div>
            <h6><i v-if='savingthrow.proficiency == 1'>Proficient</i><i v-else-if='savingthrow.proficiency == 2'>Expert</i ></h6>
        </div>
        <popup v-if='atpop' @close='close'>
            <div class='popup long'>
                <h3>{{updateid}}</h3>
                <h3>{{character.savingthrows[updateid].bonus(character.attributes[updateid].mod,character.proficiency)}}</h3>
                <h5>Proficiency:</h5>
                Proficient:<input v-model='character.savingthrows[updateid].proficiency' type='checkbox'>
                <h5>Modifiers:</h5>
                <div class='scrollcontainer'>
                    <div class='mod-div' v-for='save in character.savingthrows[updateid].modifiers' :key='save._id'>
                        Name:<input type='text' v-model='save.name'>
                        Value:<input type='number' v-model='save.value'>
                        Source:<input type='text' v-model='save.source'><br>
                        <button @click='character.savingthrows[updateid].removemodifier(save.name,save.source)'>Remove Modifier</button>
                    </div>
                </div>
                <br>
                <button @click='character.savingthrows[updateid].addmodifier("",0,"")' >Add modifier</button>
                <button @click='close()'>Close</button>
            </div>
        </popup>
  </div>
</template>

<script>
import popup from '../Popups/Popup'
export default {
    props:['character'],
    components:{
        popup
    },
    data: function() {
        return {
            atpop:false,
            updateid:'strength'
        }
    },
    methods: {
        close(){
            this.atpop=false
        },
        open(id) {
            this.updateid=id
            this.atpop=true
        }
    }

}
</script>

<style scoped>
.scrollcontainer{
    border-style:solid none solid none;
    border-width:1px;
    height:55%;
    background-color:rgb(223, 223, 223);
    overflow-y: scroll;
}
.mod-div{
    padding:0.5em;
    margin:0.3em 15% 0.3em 15%;
    border:1px solid black;
}
.savingthrows{
    padding:5px;
    grid-column-start:2;
    grid-column-end:3;
    grid-row-start:5;
    grid-row-end:9;
    row-gap: 10px;
    column-gap: 10px;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows:0.1fr 1fr 1fr 1fr;
    background-color: rgb(228, 228, 228);
    
}
.save{
    border: 1px solid black;
    background-color:white;
}
.save-mod{
    margin:0 auto 0 auto;
    border-radius:50%;
    width:3.5em;
    border: 1px solid black;
}
.save-title{
    grid-column-start:1;
    grid-column-end:3;
}
h3{
    margin:0;
}
h5{
    margin-top:0.1em;

}
h6{
    margin:0;
}
h2{
    margin:0.1em auto 0.2em auto;
}
</style>