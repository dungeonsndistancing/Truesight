<template>
    <div class='skills list'>
    <h1>Skills</h1>
    <div class='skillcontainer'>
            <div class='skill' v-for='(skill,skillid) in character.skills' :key='skillid'>
                <b>{{skill.name}}</b>
                <i>({{skill.ability.substring(0,3)}})</i><br>
                <h4>Value: {{skill.value(character.attributes[skill.ability].mod,character.proficiency)}}</h4>
                Proficient?<input type='checkbox' v-model='skill.proficiency'>
                <div v-for='mod in skill.modifiers' :key='mod.eh'>
                    name:<input class='medium input' v-model='mod.name' type='text'><br>
                    value:<input class='medium input' v-model='mod.value' type='number'><br>
                    source:<input  class='medium input' v-model='mod.source' type='text'><br>
                    <button @click='skill.removemodifier(mod.name,mod.source)'>Remove Modifier</button>
                </div><br>
                <button @click='skill.addmodifier("",0,"")'>Add Modifier</button>
            </div>
    </div>
</div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style>
.skillcontainer{
    justify-content: space-around;
    width:100%;
    height:80%;
}
.skill{
    width:45%;
    float:left;
}
</style>