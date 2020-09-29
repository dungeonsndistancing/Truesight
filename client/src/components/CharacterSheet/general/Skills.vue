<template>
    <div class='skills'>
        <h2 class='top'>Skills</h2>
        <div class='skill-card number clickable' @click='skillInfo(number)'  v-for='(skill,number) in skills' :key='skill.name'>
            <h5><i v-if='skill.proficiency> 0'>&#10003; </i>  {{skill.name}} <i>({{skill.ability.substring(0,3)}})</i></h5>
            <h3 ><b v-if='skill.value(character.attributes[skill.ability].mod,character.proficiency) > 0'>+</b>
            <b>{{skill.value(character.attributes[skill.ability].mod,character.proficiency)}}</b>
            </h3>
        </div>
        <popup v-show='skillpop' @close='close'>
            <div class='popup long'>
                <h3>{{character.skills[skillid].name}}</h3>
                <h3><b v-if='character.skills[skillid].value(character.attributes[skills[skillid].ability].mod,character.proficiency) > 0'>+</b>{{skills[skillid].value(character.attributes[skills[skillid].ability].mod,character.proficiency)}}</h3>
                <h5>Proficiency:</h5>
                Proficiency:<select class='input' v-model='skills[skillid].proficiency' type='checkbox'>
                    <option value='0'>None</option>
                    <option value='0.5'>Half Proficient</option>
                    <option value='1'>Proficient</option>
                    <option value='2'>Expert</option>
                    </select>
                <h5>Modifiers:</h5>
                <div class='scrollcontainer'>
                    <div class='mod-div' v-for='(mod,id) in skills[skillid].modifiers' :key='mod._id'>
                        <h5>Name:</h5><input class='input wide ' type='text' v-model='mod.name'>
                        <h5>Value:</h5><input class='input small' type='number' v-model='mod.value'>
                        <h5>Source:</h5><input class='input wide' type='text' v-model='mod.source'><br>
                        <button @click='removemodifier(skillid,id)'>Remove Modifier</button>
                    </div>
                </div>
                <br>
                <button @click='addmodifier(skillid)' >Add modifier</button>
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
    computed: {
        skills: function() {
            if(typeof this.character != 'undefined') {
                return Array.from(this.character.skills)
            }
            return new Array()
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
        addmodifier(skillid) {
            var temp = {skills:{}}
            temp.skills[skillid] = {modifiers:{}}
            temp.skills[skillid].modifiers[this.skills[skillid].modifiers.length] = {name: "",value:0,source:''}
            console.log(temp)
            this.$emit('update',[{task:'update',data:temp}])
        },
        removemodifier(skillid,id) {
            var temp = {skills:{}}
            temp.skills[skillid] = {modifiers:[id]}
            this.$emit('update',[{task:'remove',data:temp}])
        },
        close() {
            this.update()
            this.skillpop = false
        },
        update() {
            var temp = {skills:{}}
            temp.skills[this.skillid] = this.skills[this.skillid]
            this.$emit('update',[{task:'update',data:temp}])
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
    border:1px solid $border-color;
    border-radius:$border-radius;
    background-color:white;
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