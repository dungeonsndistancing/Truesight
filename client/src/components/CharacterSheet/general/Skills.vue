<template>
    <div class='skills'>
        <h2 class='top'>Skills</h2>
        <div class='skill-card number clickable' @click='skillInfo(number)'  v-for='(skill,number) in character.skills' :key='skill.name'>
            <h5><i v-if='skill.proficiency> 0'>&#10003; </i>  {{skill.name}} <i>({{skill.ability.substring(0,3)}})</i></h5>
            <h3 ><b v-if='skill.value(character.attributes[skill.ability].mod,character.proficiency) > 0'>+</b>
            <b>{{skill.value(character.attributes[skill.ability].mod,character.proficiency)}}</b>
            </h3>
        </div>
        <popup v-show='skillpop' @close='close'>
            <div class='popup long'>
                <h3>{{character.skills[skillid].name}}</h3>
                <h3><b v-if='character.skills[skillid].value(character.attributes[character.skills[skillid].ability].mod,character.proficiency) > 0'>+</b>{{character.skills[skillid].value(character.attributes[character.skills[skillid].ability].mod,character.proficiency)}}</h3>
                <h5>Proficiency:</h5>
                Proficient:<input class='checkbox' v-model='character.skills[skillid].proficiency' type='checkbox'>
                <h5>Modifiers:</h5>
                <div class='scrollcontainer'>
                    <div class='mod-div' v-for='mod in character.skills[skillid].modifiers' :key='mod._id'>
                        <h5>Name:</h5><input class='input wide ' type='text' v-model='mod.name'>
                        <h5>Value:</h5><input class='input small' type='number' v-model='mod.value'>
                        <h5>Source:</h5><input class='input wide' type='text' v-model='mod.source'><br>
                        <button @click='character.skills[skillid].removemodifier(mod.name,mod.source)'>Remove Modifier</button>
                    </div>
                </div>
                <br>
                <button @click='character.skills[skillid].addmodifier("",0,"")' >Add modifier</button>
                <button @click='close()'>Close</button>
            </div>
        </popup>
    </div>
</template>

<script>
import popup from '../../Popups/Popup'
export default {
    props:['character'],
    data:function(){
        return{
            skillid:0,
            skillpop:false
        }

    },
    components:{
        popup
    },
    methods: {
        skillInfo(id){
            this.skillid = id
            this.skillpop = true
        },
        close() {
            this.$emit('update',{keys:['skills'],values:[this.character.skills]})
            this.skillpop = false
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.skills{
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start:3;
    grid-row-end:9;
    border:1px solid black;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows:0.3fr repeat(9,1fr);
    grid-gap:5px;
    overflow-y:scroll;
}
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
.top{
    grid-column-start:1;
    grid-column-end:3;
}
h2{
    margin:0;
}
h3{ margin:0}
h5{
    font-size:1.1vw;
    margin:0;
}
h4{
    margin:0;
}
h6{
    margin:0;
}
@media only screen and(max-width:$small-screen) {
    .skills {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start:11;
        grid-row-end:17;
    }
}
</style>