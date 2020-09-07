<template>
    <div class='savingthrows list'>
    <h1>Saving Throws</h1>
    <div v-for='(savingthrow,throwid) in character.savingthrows' :key='throwid'><b>{{throwid}}</b><br>
        Total:{{savingthrow.bonus(character.attributes[throwid].mod,character.proficiency)}}<br>
        proficient?<input type='checkbox' v-model='savingthrow.proficiency'>
        <div v-for='mod in savingthrow.modifiers' :key='mod.eh'>
            name:<input class='medium input' v-model='mod.name' type='text'><br>
            value:<input class='medium input' v-model='mod.value' type='number'><br>
            source:<input  class='medium input' v-model='mod.source' type='text'><br>
            <button @click='savingthrow.removemodifier(mod.name,mod.source)'>Remove Modifier</button>
        </div><br>
        <button @click='savingthrow.addmodifier("",0,"")'>Add Modifier</button>
    </div>
</div>
</template>

<script>
export default {
    props:['character']
}
</script>

<style>

</style>